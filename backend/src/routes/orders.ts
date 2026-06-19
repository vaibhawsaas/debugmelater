import { Router, Request, Response } from 'express';
import Order from '../models/Order';
import Project from '../models/Project';
import { authMiddleware } from '../middleware/auth';
import { uploadImage } from '../middleware/upload';
import { uploadImageToCloudinary } from '../services/cloudinaryService';
import { sendOrderReceivedEmail, sendOrderRejectedEmail } from '../services/emailService';
import { generateAndSendDownloadLink } from '../services/downloadLinkService';

const router = Router();

// Generate unique order ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DML-ORD-${timestamp}-${random}`;
};

// POST /api/orders — Create order (public)
router.post('/', uploadImage.single('paymentScreenshot'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerName, customerEmail, customerPhone, projectId, message } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !projectId) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: 'Payment screenshot is required' });
      return;
    }

    const { url: screenshotUrl } = await uploadImageToCloudinary(
      req.file.path,
      'debugmelater/payment-screenshots'
    );

    const orderId = generateOrderId();

    const order = await Order.create({
      orderId,
      customerName,
      customerEmail: customerEmail.toLowerCase(),
      customerPhone,
      projectId: project._id,
      projectCode: project.code,
      projectTitle: project.title,
      amount: project.price,
      paymentScreenshot: screenshotUrl,
      message,
      status: 'pending',
    });

    // Send confirmation email (non-blocking)
    sendOrderReceivedEmail(
      customerEmail,
      customerName,
      orderId,
      project.title,
      project.price
    ).catch(console.error);

    res.status(201).json({
      success: true,
      orderId: order.orderId,
      message: 'Order submitted. Download link will be sent within 2–4 hours.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to submit order';
    res.status(500).json({ error: message });
  }
});

// GET /api/orders — Admin list
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = '1', limit = '20', search } = req.query;
    const query: Record<string, unknown> = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('projectId', 'title code images')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .lean(),
      Order.countDocuments(query),
    ]);

    res.json({ orders, total });
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// PATCH /api/orders/:id/approve
router.patch('/:id/approve', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate('projectId');
    if (!order) { res.status(404).json({ error: 'Order not found' }); return; }

    const project = order.projectId as unknown as { _id: string; title: string; zipFile: { publicId: string } };

    if (!project?.zipFile?.publicId) {
      res.status(400).json({ error: 'Project has no ZIP file. Upload source code first.' });
      return;
    }

    order.status = 'approved';
    order.downloadSent = true;
    await order.save();

    // Update project sales count
    await Project.findByIdAndUpdate(project._id, { $inc: { sales: 1 } });

    // Generate and send download link
    await generateAndSendDownloadLink(
      order._id.toString(),
      project._id.toString(),
      order.customerEmail,
      order.customerName,
      project.title,
      project.zipFile.publicId
    );

    res.json({ success: true, message: 'Order approved and download link sent' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to approve order';
    res.status(500).json({ error: message });
  }
});

// PATCH /api/orders/:id/reject
router.patch('/:id/reject', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) { res.status(404).json({ error: 'Order not found' }); return; }

    order.status = 'rejected';
    order.rejectionNote = note;
    await order.save();

    sendOrderRejectedEmail(
      order.customerEmail,
      order.customerName,
      order.orderId,
      order.projectTitle,
      note
    ).catch(console.error);

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to reject order' });
  }
});

// GET /api/orders/stats — Dashboard stats
router.get('/stats/summary', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const [totalOrders, pendingOrders, approvedOrders, revenueAgg] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'approved' }),
      Order.aggregate([
        { $match: { status: 'approved' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      approvedOrders,
      totalRevenue: revenueAgg[0]?.total || 0,
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;

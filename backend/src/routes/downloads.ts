import { Router, Request, Response } from 'express';
import Download from '../models/Download';
import Order from '../models/Order';
import { authMiddleware } from '../middleware/auth';
import { generateAndSendDownloadLink } from '../services/downloadLinkService';

const router = Router();

// GET /api/downloads/:downloadId — Public download redirect
router.get('/:downloadId', async (req: Request, res: Response): Promise<void> => {
  try {
    const download = await Download.findById(req.params.downloadId).populate('projectId', 'title');

    if (!download) {
      res.status(404).json({ error: 'Download not found' });
      return;
    }

    if (new Date() > download.expiresAt) {
      res.status(410).json({ error: 'Download link has expired. Please contact support.' });
      return;
    }

    if (download.downloadCount >= download.maxDownloads) {
      res.status(403).json({ error: 'Download limit reached (max 3 downloads per purchase).' });
      return;
    }

    download.downloadCount += 1;
    await download.save();

    res.redirect(download.signedUrl);
  } catch {
    res.status(500).json({ error: 'Download failed' });
  }
});

// GET /api/downloads — Admin list
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [downloads, total] = await Promise.all([
      Download.find()
        .populate('orderId', 'orderId customerName customerEmail')
        .populate('projectId', 'title code')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .lean(),
      Download.countDocuments(),
    ]);

    res.json({ downloads, total });
  } catch {
    res.status(500).json({ error: 'Failed to fetch downloads' });
  }
});

// POST /api/downloads/:orderId/regenerate — Admin regenerate link
router.post('/:orderId/regenerate', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.orderId).populate('projectId');
    if (!order) { res.status(404).json({ error: 'Order not found' }); return; }

    const project = order.projectId as unknown as { _id: string; title: string; zipFile: { publicId: string } };

    if (!project?.zipFile?.publicId) {
      res.status(400).json({ error: 'No ZIP file found for this project' });
      return;
    }

    const downloadUrl = await generateAndSendDownloadLink(
      order._id.toString(),
      project._id.toString(),
      order.customerEmail,
      order.customerName,
      project.title,
      project.zipFile.publicId
    );

    res.json({ success: true, downloadUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to regenerate link';
    res.status(500).json({ error: message });
  }
});

export default router;

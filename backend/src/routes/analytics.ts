import { Router, Request, Response } from 'express';
import Order from '../models/Order';
import Project from '../models/Project';
import Download from '../models/Download';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/analytics/dashboard
router.get('/dashboard', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalRevenue,
      monthRevenue,
      lastMonthRevenue,
      totalOrders,
      pendingOrders,
      totalProjects,
      publishedProjects,
      totalDownloads,
      revenueByMonth,
      topProjects,
      recentOrders,
    ] = await Promise.all([
      // Total revenue
      Order.aggregate([
        { $match: { status: 'approved' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      // This month revenue
      Order.aggregate([
        { $match: { status: 'approved', createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      // Last month revenue
      Order.aggregate([
        { $match: { status: 'approved', createdAt: { $gte: lastMonth, $lt: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Project.countDocuments(),
      Project.countDocuments({ status: 'published' }),
      Download.countDocuments(),
      // Revenue last 12 months
      Order.aggregate([
        { $match: { status: 'approved', createdAt: { $gte: new Date(now.getFullYear() - 1, now.getMonth(), 1) } } },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            revenue: { $sum: '$amount' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]),
      // Top selling projects
      Project.find({ status: 'published' }).sort({ sales: -1 }).limit(5).select('title code sales price images').lean(),
      // Recent orders
      Order.find().sort({ createdAt: -1 }).limit(10).populate('projectId', 'title code').lean(),
    ]);

    const thisMonthRev = monthRevenue[0]?.total || 0;
    const lastMonthRev = lastMonthRevenue[0]?.total || 0;
    const revenueGrowth = lastMonthRev > 0
      ? (((thisMonthRev - lastMonthRev) / lastMonthRev) * 100).toFixed(1)
      : '0';

    res.json({
      stats: {
        totalRevenue: totalRevenue[0]?.total || 0,
        monthRevenue: thisMonthRev,
        revenueGrowth,
        totalOrders,
        pendingOrders,
        totalProjects,
        publishedProjects,
        totalDownloads,
      },
      revenueByMonth,
      topProjects,
      recentOrders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// GET /api/analytics/orders-by-status
router.get('/orders-by-status', authMiddleware, async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch order stats' });
  }
});

export default router;

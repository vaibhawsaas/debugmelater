import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authLimiter } from '../middleware/rateLimit';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// POST /api/auth/admin/login
router.post('/admin/login', authLimiter, async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // Check if stored password is a bcrypt hash or plain text
  let isValid = false;
  if (adminPassword) {
    if (adminPassword.startsWith('$2')) {
      isValid = await bcrypt.compare(password, adminPassword);
    } else {
      isValid = password === adminPassword;
    }
  }

  if (!isValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { email: adminEmail },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  res.cookie('adminToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ success: true, message: 'Logged in successfully' });
});

// POST /api/auth/admin/logout
router.post('/admin/logout', (req: Request, res: Response) => {
  res.clearCookie('adminToken');
  res.json({ success: true, message: 'Logged out' });
});

// GET /api/auth/admin/me
router.get('/admin/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ email: req.admin?.email, role: 'admin' });
});

export default router;

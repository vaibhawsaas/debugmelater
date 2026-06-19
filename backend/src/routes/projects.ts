import { Router, Request, Response } from 'express';
import slugify from '../utils/slugify';
import Project from '../models/Project';
import { authMiddleware } from '../middleware/auth';
import { uploadMixed } from '../middleware/upload';
import {
  uploadImageToCloudinary,
  uploadZipToCloudinary,
  deleteFromCloudinary,
} from '../services/cloudinaryService';
import fs from 'fs';

const router = Router();

// GET /api/projects — Public list
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '12',
      search,
      category,
      technologies,
      sort = 'createdAt',
      order = 'desc',
      status = 'published',
    } = req.query;

    const query: Record<string, unknown> = { status };

    if (search) {
      query.$text = { $search: search as string };
    }
    if (category && category !== 'all') {
      query.category = category;
    }
    if (technologies) {
      const techs = (technologies as string).split(',');
      query.technologies = { $in: techs };
    }

    const sortObj: Record<string, 1 | -1> = {
      [sort as string]: order === 'asc' ? 1 : -1,
    };

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const [projects, total] = await Promise.all([
      Project.find(query).sort(sortObj).skip(skip).limit(parseInt(limit as string)).lean(),
      Project.countDocuments(query),
    ]);

    res.json({
      projects,
      total,
      page: parseInt(page as string),
      pages: Math.ceil(total / parseInt(limit as string)),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/featured — Featured/latest published
router.get('/featured', async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

// GET /api/projects/:slug — Public detail
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: 'published' });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    // Increment views
    project.views += 1;
    await project.save();
    res.json(project);
  } catch {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// ── Admin routes ─────────────────────────────────────────────────────────────

// GET /api/projects/admin/all
router.get('/admin/all', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '20', status } = req.query;
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const [projects, total] = await Promise.all([
      Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit as string)).lean(),
      Project.countDocuments(query),
    ]);
    res.json({ projects, total });
  } catch {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST /api/projects — Create
router.post(
  '/',
  authMiddleware,
  uploadMixed.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'screenshots', maxCount: 8 },
    { name: 'zipFile', maxCount: 1 },
  ]),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const files = req.files as Record<string, Express.Multer.File[]>;
      const body = req.body;

      let mainImageUrl = '';
      let screenshotUrls: string[] = [];
      let zipData = { publicId: '', size: 0, url: '' };

      if (files?.mainImage?.[0]) {
        const result = await uploadImageToCloudinary(files.mainImage[0].path, 'debugmelater/projects');
        mainImageUrl = result.url;
      }

      if (files?.screenshots?.length) {
        const uploads = await Promise.all(
          files.screenshots.map((f) => uploadImageToCloudinary(f.path, 'debugmelater/screenshots'))
        );
        screenshotUrls = uploads.map((u) => u.url);
      }

      if (files?.zipFile?.[0]) {
        const result = await uploadZipToCloudinary(files.zipFile[0].path, 'debugmelater/zips');
        zipData = result;
      }

      const title = body.title;
      const slug = slugify(title);
      const features = body.features ? JSON.parse(body.features) : [];
      const technologies = body.technologies ? JSON.parse(body.technologies) : [];

      const project = await Project.create({
        title,
        slug,
        code: body.code?.toUpperCase() || `DML-${Date.now()}`,
        description: body.description,
        shortDescription: body.shortDescription,
        features,
        technologies,
        category: body.category,
        price: parseFloat(body.price),
        youtubeUrl: body.youtubeUrl,
        status: body.status || 'draft',
        images: { main: mainImageUrl, screenshots: screenshotUrls },
        zipFile: zipData,
      });

      res.status(201).json(project);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create project';
      res.status(500).json({ error: message });
    }
  }
);

// PUT /api/projects/:id — Update
router.put('/:id', authMiddleware, uploadMixed.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'screenshots', maxCount: 8 },
  { name: 'zipFile', maxCount: 1 },
]), async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) { res.status(404).json({ error: 'Project not found' }); return; }

    const files = req.files as Record<string, Express.Multer.File[]>;
    const body = req.body;

    if (files?.mainImage?.[0]) {
      const result = await uploadImageToCloudinary(files.mainImage[0].path, 'debugmelater/projects');
      project.images.main = result.url;
    }

    if (files?.screenshots?.length) {
      const uploads = await Promise.all(
        files.screenshots.map((f) => uploadImageToCloudinary(f.path, 'debugmelater/screenshots'))
      );
      project.images.screenshots = [...project.images.screenshots, ...uploads.map(u => u.url)];
    }

    if (files?.zipFile?.[0]) {
      const result = await uploadZipToCloudinary(files.zipFile[0].path, 'debugmelater/zips');
      project.zipFile = result;
    }

    if (body.title) { project.title = body.title; project.slug = slugify(body.title); }
    if (body.code) project.code = body.code.toUpperCase();
    if (body.description) project.description = body.description;
    if (body.shortDescription) project.shortDescription = body.shortDescription;
    if (body.features) project.features = JSON.parse(body.features);
    if (body.technologies) project.technologies = JSON.parse(body.technologies);
    if (body.category) project.category = body.category;
    if (body.price) project.price = parseFloat(body.price);
    if (body.youtubeUrl !== undefined) project.youtubeUrl = body.youtubeUrl;
    if (body.status) project.status = body.status;

    await project.save();
    res.json(project);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update project';
    res.status(500).json({ error: message });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) { res.status(404).json({ error: 'Project not found' }); return; }

    // Delete from Cloudinary
    if (project.zipFile?.publicId) {
      await deleteFromCloudinary(project.zipFile.publicId, 'raw').catch(() => {});
    }

    await project.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;

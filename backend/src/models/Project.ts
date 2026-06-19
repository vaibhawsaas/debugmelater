import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  code: string;
  description: string;
  shortDescription: string;
  features: string[];
  technologies: string[];
  category: string;
  price: number;
  currency: string;
  images: {
    main: string;
    screenshots: string[];
  };
  zipFile: {
    publicId: string;
    size: number;
    url: string;
  };
  youtubeUrl?: string;
  status: 'draft' | 'published';
  views: number;
  sales: number;
  rating: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    features: [{ type: String }],
    technologies: [{ type: String }],
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    images: {
      main: { type: String, default: '' },
      screenshots: [{ type: String }],
    },
    zipFile: {
      publicId: { type: String, default: '' },
      size: { type: Number, default: 0 },
      url: { type: String, default: '' },
    },
    youtubeUrl: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    views: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Compound index for performance
ProjectSchema.index({ status: 1, createdAt: -1 });
ProjectSchema.index({ title: 'text', description: 'text', shortDescription: 'text' });
ProjectSchema.index({ category: 1, status: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);

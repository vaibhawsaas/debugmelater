import mongoose, { Document, Schema } from 'mongoose';

export interface IDownload extends Document {
  orderId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  customerId: string;
  signedUrl: string;
  expiresAt: Date;
  downloadCount: number;
  maxDownloads: number;
  createdAt: Date;
}

const DownloadSchema = new Schema<IDownload>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    customerId: { type: String, required: true },
    signedUrl: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    downloadCount: { type: Number, default: 0 },
    maxDownloads: { type: Number, default: 3 },
  },
  { timestamps: true }
);

DownloadSchema.index({ orderId: 1 });
DownloadSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IDownload>('Download', DownloadSchema);

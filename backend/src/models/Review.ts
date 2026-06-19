import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  projectId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 1000 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ReviewSchema.index({ projectId: 1, approved: 1 });

export default mongoose.model<IReview>('Review', ReviewSchema);

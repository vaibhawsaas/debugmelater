import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectId: mongoose.Types.ObjectId;
  projectCode: string;
  projectTitle: string;
  amount: number;
  currency: string;
  paymentScreenshot: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionNote?: string;
  downloadSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, lowercase: true, trim: true },
    customerPhone: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    projectCode: { type: String, required: true },
    projectTitle: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentScreenshot: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    rejectionNote: { type: String },
    downloadSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ customerEmail: 1 });

export default mongoose.model<IOrder>('Order', OrderSchema);

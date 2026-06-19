import Download from '../models/Download';
import { generateSignedUrl } from './cloudinaryService';
import { sendDownloadLinkEmail } from './emailService';
import mongoose from 'mongoose';

export const generateAndSendDownloadLink = async (
  orderId: string,
  projectId: string,
  customerEmail: string,
  customerName: string,
  projectTitle: string,
  zipPublicId: string
): Promise<string> => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  const signedUrl = generateSignedUrl(zipPublicId, 86400);

  // Create or update download record
  const download = await Download.findOneAndUpdate(
    { orderId: new mongoose.Types.ObjectId(orderId) },
    {
      orderId: new mongoose.Types.ObjectId(orderId),
      projectId: new mongoose.Types.ObjectId(projectId),
      customerId: customerEmail,
      signedUrl,
      expiresAt,
      downloadCount: 0,
      maxDownloads: 3,
    },
    { upsert: true, new: true }
  );

  // Build the download URL pointing to our API endpoint
  const downloadUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/api/download/${download._id}`;

  await sendDownloadLinkEmail(
    customerEmail,
    customerName,
    projectTitle,
    downloadUrl,
    orderId
  );

  return downloadUrl;
};

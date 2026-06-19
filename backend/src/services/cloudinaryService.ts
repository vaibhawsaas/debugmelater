import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (
  filePath: string,
  folder: string = 'debugmelater/images'
): Promise<{ url: string; publicId: string }> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto',
  });

  // Clean up temp file
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  return { url: result.secure_url, publicId: result.public_id };
};

export const uploadZipToCloudinary = async (
  filePath: string,
  folder: string = 'debugmelater/zips'
): Promise<{ url: string; publicId: string; size: number }> => {
  const stats = fs.statSync(filePath);
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'raw',
    access_mode: 'authenticated',
  });

  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  return {
    url: result.secure_url,
    publicId: result.public_id,
    size: stats.size,
  };
};

export const generateSignedUrl = (
  publicId: string,
  expiresInSeconds: number = 86400
): string => {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  return cloudinary.url(publicId, {
    resource_type: 'raw',
    sign_url: true,
    expires_at: expiresAt,
    secure: true,
  });
};

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<void> => {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export default cloudinary;

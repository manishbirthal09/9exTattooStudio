// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Storage for images (portfolio, blog cover, testimonial thumbnail)
// export const imageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: '9ex-tattoo/images',
//     resource_type: 'image',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [{ quality: 'auto', fetch_format: 'auto' }],
//   },
// });

// // Storage for testimonial videos
// export const videoStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: '9ex-tattoo/videos',
//     resource_type: 'video',
//     allowed_formats: ['mp4', 'mov', 'webm'],
//   },
// });

// export default cloudinary;

import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? 'Present' : 'MISSING',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'MISSING',
});

// Uploads an in-memory file buffer (from multer.memoryStorage) to Cloudinary.
export const uploadBufferToCloudinary = (file, { folder, resourceType = 'image' }) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });

export default cloudinary;
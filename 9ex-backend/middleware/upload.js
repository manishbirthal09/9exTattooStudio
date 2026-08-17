// import multer from 'multer';
// import { imageStorage, videoStorage } from '../config/cloudinary.js';

// // use: uploadImage.single('image')
// export const uploadImage = multer({
//   storage: imageStorage,
//   limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
// });

// // use: uploadVideo.single('video')
// export const uploadVideo = multer({
//   storage: videoStorage,
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
// });

// // Testimonial form has a video field AND an optional image thumbnail field.
// // Cloudinary needs a different resource_type for each, so we use memory
// // storage here and upload each buffer manually in the controller
// // (see uploadBufferToCloudinary in controllers/testimonialController.js).
// export const uploadTestimonial = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 100 * 1024 * 1024 },
// });
import multer from 'multer';

// All uploads use memory storage — files are buffered in RAM briefly,
// then manually pushed to Cloudinary in the controller via uploadBufferToCloudinary.
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

export const uploadTestimonial = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});
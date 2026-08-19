 
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
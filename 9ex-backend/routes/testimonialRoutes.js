import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';
import { uploadTestimonial } from '../middleware/upload.js';

const router = express.Router();

const fields = uploadTestimonial.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);

router.get('/', getTestimonials); // public
router.post('/', protect, fields, createTestimonial);
router.put('/:id', protect, fields, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;

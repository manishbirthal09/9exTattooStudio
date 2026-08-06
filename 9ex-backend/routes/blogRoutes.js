import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getBlogs); // public (published only) / admin with ?all=true
router.get('/id/:id', protect, getBlogById); // admin — must come before /:slug
router.get('/:slug', getBlogBySlug); // public
router.post('/', protect, uploadImage.single('coverImage'), createBlog);
router.put('/:id', protect, uploadImage.single('coverImage'), updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;

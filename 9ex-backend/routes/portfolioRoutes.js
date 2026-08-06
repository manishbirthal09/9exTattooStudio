import express from 'express';
import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getPortfolio); // public
router.post('/', protect, uploadImage.single('image'), createPortfolio);
router.put('/:id', protect, uploadImage.single('image'), updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

export default router;

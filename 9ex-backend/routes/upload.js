import express from 'express';
import { getUploadSignature } from '../controllers/uploadController.js';
// apna existing admin auth middleware import karo yahan
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signature', /* protect, */ getUploadSignature);

export default router;
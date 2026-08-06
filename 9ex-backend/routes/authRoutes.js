import express from 'express';
import { login, getMe, seedAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/seed-admin', seedAdmin); // use once, then remove or restrict

export default router;

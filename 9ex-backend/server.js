
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

import uploadRoutes from './routes/upload.js';

connectDB();
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('ADMIN_URL:', process.env.ADMIN_URL);
const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL, 'https://www.9extattoo.com'].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '9Ex Tattoo Studio API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// centralized error handler (multer errors etc. land here too)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

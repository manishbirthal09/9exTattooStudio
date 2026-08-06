import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      // adjust to match your existing gallery categories
      enum: ['numerology', 'astrology', 'portrait', 'blackwork', 'fineline', 'coverup', 'other'],
      default: 'other',
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    tags: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false }, // show on homepage slider
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Portfolio', portfolioSchema);

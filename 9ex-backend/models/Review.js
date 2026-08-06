import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    quote: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    type: { type: String, default: 'Google Review' }, // e.g. Google Review, Walk-in, Consultation
    approved: { type: Boolean, default: true }, // toggle visibility without deleting
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);

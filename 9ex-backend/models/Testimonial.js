import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    caption: { type: String, trim: true },
    video: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    thumbnail: {
      url: { type: String },
      publicId: { type: String },
    },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);

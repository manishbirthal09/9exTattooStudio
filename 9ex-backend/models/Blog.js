import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    excerpt: { type: String, trim: true, maxlength: 300 },
    content: { type: String, required: true }, // HTML or markdown from a rich text editor
    author: { type: String, default: 'Shashikant Shelar' },
    published: { type: Boolean, default: true },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

blogSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Blog', blogSchema);

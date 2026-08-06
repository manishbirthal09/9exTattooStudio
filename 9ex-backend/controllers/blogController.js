import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';

// GET /api/blogs  (public — only published, unless ?all=true from admin)
export const getBlogs = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/blogs/:slug  (public)
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/blogs/id/:id  (admin — used to prefill edit forms)
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/blogs  (admin, multipart with field "coverImage")
export const createBlog = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Cover image is required' });

    const { title, excerpt, content, author, published, tags } = req.body;

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      author,
      published: published === 'true' || published === true,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      coverImage: { url: req.file.path, publicId: req.file.filename },
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/blogs/:id  (admin)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });

    const { title, excerpt, content, author, published, tags } = req.body;
    if (title !== undefined) blog.title = title;
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (author !== undefined) blog.author = author;
    if (published !== undefined) blog.published = published === 'true' || published === true;
    if (tags !== undefined) blog.tags = tags.split(',').map((t) => t.trim());

    if (req.file) {
      if (blog.coverImage?.publicId) {
        await cloudinary.uploader.destroy(blog.coverImage.publicId);
      }
      blog.coverImage = { url: req.file.path, publicId: req.file.filename };
    }

    await blog.save(); // re-runs pre-validate slug hook
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/blogs/:id  (admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });

    if (blog.coverImage?.publicId) {
      await cloudinary.uploader.destroy(blog.coverImage.publicId);
    }
    await blog.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

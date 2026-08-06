import Portfolio from '../models/Portfolio.js';
import cloudinary from '../config/cloudinary.js';

// GET /api/portfolio  (public)
export const getPortfolio = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';

    const items = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/portfolio  (admin, multipart with field "image")
export const createPortfolio = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image is required' });

    const { title, category, tags, featured, order } = req.body;

    const item = await Portfolio.create({
      title,
      category,
      featured: featured === 'true' || featured === true,
      order: order || 0,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      image: {
        url: req.file.path,
        publicId: req.file.filename,
      },
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/portfolio/:id  (admin, image optional)
export const updatePortfolio = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const { title, category, tags, featured, order } = req.body;
    if (title !== undefined) item.title = title;
    if (category !== undefined) item.category = category;
    if (featured !== undefined) item.featured = featured === 'true' || featured === true;
    if (order !== undefined) item.order = order;
    if (tags !== undefined) item.tags = tags.split(',').map((t) => t.trim());

    if (req.file) {
      // delete old image from Cloudinary before replacing
      if (item.image?.publicId) {
        await cloudinary.uploader.destroy(item.image.publicId);
      }
      item.image = { url: req.file.path, publicId: req.file.filename };
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/portfolio/:id  (admin)
export const deletePortfolio = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (item.image?.publicId) {
      await cloudinary.uploader.destroy(item.image.publicId);
    }
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

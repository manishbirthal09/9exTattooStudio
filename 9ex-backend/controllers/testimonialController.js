import Testimonial from '../models/Testimonial.js';
import cloudinary from '../config/cloudinary.js';

// Uploads an in-memory file buffer (from multer.memoryStorage) to Cloudinary
// with the correct resource_type, since video and thumbnail need different
// upload handling.
const uploadBufferToCloudinary = (file, { folder, resourceType }) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });

// GET /api/testimonials  (public — only published unless ?all=true)
export const getTestimonials = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const items = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/testimonials  (admin, multipart fields: "video" required, "thumbnail" optional)
export const createTestimonial = async (req, res) => {
  try {
    const videoFile = req.files?.video?.[0];
    const thumbFile = req.files?.thumbnail?.[0];

    if (!videoFile) return res.status(400).json({ message: 'Video is required' });

    const { clientName, caption, published, order } = req.body;

    const videoResult = await uploadBufferToCloudinary(videoFile, {
      folder: '9ex-tattoo/videos',
      resourceType: 'video',
    });

    let thumbnail;
    if (thumbFile) {
      const thumbResult = await uploadBufferToCloudinary(thumbFile, {
        folder: '9ex-tattoo/images',
        resourceType: 'image',
      });
      thumbnail = { url: thumbResult.secure_url, publicId: thumbResult.public_id };
    }

    const item = await Testimonial.create({
      clientName,
      caption,
      published: published === 'true' || published === true,
      order: order || 0,
      video: { url: videoResult.secure_url, publicId: videoResult.public_id },
      thumbnail,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/testimonials/:id  (admin)
export const updateTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const { clientName, caption, published, order } = req.body;
    if (clientName !== undefined) item.clientName = clientName;
    if (caption !== undefined) item.caption = caption;
    if (published !== undefined) item.published = published === 'true' || published === true;
    if (order !== undefined) item.order = order;

    const videoFile = req.files?.video?.[0];
    const thumbFile = req.files?.thumbnail?.[0];

    if (videoFile) {
      if (item.video?.publicId) {
        await cloudinary.uploader.destroy(item.video.publicId, { resource_type: 'video' });
      }
      const videoResult = await uploadBufferToCloudinary(videoFile, {
        folder: '9ex-tattoo/videos',
        resourceType: 'video',
      });
      item.video = { url: videoResult.secure_url, publicId: videoResult.public_id };
    }

    if (thumbFile) {
      if (item.thumbnail?.publicId) {
        await cloudinary.uploader.destroy(item.thumbnail.publicId, { resource_type: 'image' });
      }
      const thumbResult = await uploadBufferToCloudinary(thumbFile, {
        folder: '9ex-tattoo/images',
        resourceType: 'image',
      });
      item.thumbnail = { url: thumbResult.secure_url, publicId: thumbResult.public_id };
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/testimonials/:id  (admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (item.video?.publicId) {
      await cloudinary.uploader.destroy(item.video.publicId, { resource_type: 'video' });
    }
    if (item.thumbnail?.publicId) {
      await cloudinary.uploader.destroy(item.thumbnail.publicId, { resource_type: 'image' });
    }
    await item.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

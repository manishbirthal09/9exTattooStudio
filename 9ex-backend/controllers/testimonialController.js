import Testimonial from '../models/Testimonial.js';
import cloudinary, { uploadBufferToCloudinary } from '../config/cloudinary.js';



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
    const thumbFile = req.files?.thumbnail?.[0];
    const { clientName, caption, published, order, videoUrl, videoPublicId } = req.body;

    if (!videoUrl || !videoPublicId) {
      return res.status(400).json({ message: 'Video is required' });
    }

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
      video: { url: videoUrl, publicId: videoPublicId },
      thumbnail,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// PUT /api/testimonials/:id  (admin)
// export const updateTestimonial = async (req, res) => {
//   try {
//     const item = await Testimonial.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: 'Not found' });

//     const { clientName, caption, published, order } = req.body;
//     if (clientName !== undefined) item.clientName = clientName;
//     if (caption !== undefined) item.caption = caption;
//     if (published !== undefined) item.published = published === 'true' || published === true;
//     if (order !== undefined) item.order = order;

//     const videoFile = req.files?.video?.[0];
//     const thumbFile = req.files?.thumbnail?.[0];

//     if (videoFile) {
//       if (item.video?.publicId) {
//         await cloudinary.uploader.destroy(item.video.publicId, { resource_type: 'video' });
//       }
//       const videoResult = await uploadBufferToCloudinary(videoFile, {
//         folder: '9ex-tattoo/videos',
//         resourceType: 'video',
//       });
//       item.video = { url: videoResult.secure_url, publicId: videoResult.public_id };
//     }

//     if (thumbFile) {
//       if (item.thumbnail?.publicId) {
//         await cloudinary.uploader.destroy(item.thumbnail.publicId, { resource_type: 'image' });
//       }
//       const thumbResult = await uploadBufferToCloudinary(thumbFile, {
//         folder: '9ex-tattoo/images',
//         resourceType: 'image',
//       });
//       item.thumbnail = { url: thumbResult.secure_url, publicId: thumbResult.public_id };
//     }

//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const updateTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const { clientName, caption, published, order, videoUrl, videoPublicId } = req.body;
    if (clientName !== undefined) item.clientName = clientName;
    if (caption !== undefined) item.caption = caption;
    if (published !== undefined) item.published = published === 'true' || published === true;
    if (order !== undefined) item.order = order;

    const thumbFile = req.files?.thumbnail?.[0];

    if (videoUrl && videoPublicId) {
      if (item.video?.publicId) {
        await cloudinary.uploader.destroy(item.video.publicId, { resource_type: 'video' });
      }
      item.video = { url: videoUrl, publicId: videoPublicId };
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

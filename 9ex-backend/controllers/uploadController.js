import cloudinary from '../config/cloudinary.js'; 

export const getUploadSignature = (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = req.body.folder || '9ex-tattoo/images';

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  
  
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
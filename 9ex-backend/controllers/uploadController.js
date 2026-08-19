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
import Review from '../models/Review.js';

// GET /api/reviews  (public — only approved unless ?all=true from admin)
export const getReviews = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { approved: true };
    const reviews = await Review.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/reviews  (admin)
export const createReview = async (req, res) => {
  try {
    const { name, location, quote, rating, type, approved, order } = req.body;
    const review = await Review.create({
      name,
      location,
      quote,
      rating,
      type,
      approved: approved === undefined ? true : approved === 'true' || approved === true,
      order: order || 0,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/reviews/:id  (admin)
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Not found' });

    const { name, location, quote, rating, type, approved, order } = req.body;
    if (name !== undefined) review.name = name;
    if (location !== undefined) review.location = location;
    if (quote !== undefined) review.quote = quote;
    if (rating !== undefined) review.rating = rating;
    if (type !== undefined) review.type = type;
    if (approved !== undefined) review.approved = approved === 'true' || approved === true;
    if (order !== undefined) review.order = order;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/reviews/:id  (admin)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Not found' });
    await review.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email?.toLowerCase() });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.json(req.admin);
};

// POST /api/auth/seed-admin
// One-time route to create the first admin. Protected by a secret key
// from .env, NOT by JWT (since no admin exists yet). Remove/disable
// after first use in production.
export const seedAdmin = async (req, res) => {
  try {
    const { key } = req.body;
    if (key !== process.env.ADMIN_SEED_KEY) {
      return res.status(403).json({ message: 'Invalid seed key' });
    }

    const existing = await Admin.findOne({ email: process.env.ADMIN_SEED_EMAIL });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      name: 'Shashikant Shelar',
      email: process.env.ADMIN_SEED_EMAIL,
      password: process.env.ADMIN_SEED_PASSWORD,
    });

    res.status(201).json({ message: 'Admin created', email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

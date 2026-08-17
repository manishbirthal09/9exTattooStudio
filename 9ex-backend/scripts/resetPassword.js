import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  
  const email = 'admin@9extattoo.com';
const newPassword = '9Ex#Tattoo!Studio2026$';

  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log('No admin found with this email');
  } else {
    admin.password = newPassword; // pre('save') hook automatically hash karega
    await admin.save();
    console.log('Password reset done for', email);
  }

  await mongoose.disconnect();
};

run();
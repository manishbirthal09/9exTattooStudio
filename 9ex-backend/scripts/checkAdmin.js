import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const admins = await Admin.find({});
  console.log('Total admins in DB:', admins.length);
  admins.forEach((a) => console.log('-', a.email));
  await mongoose.disconnect();
};

run();
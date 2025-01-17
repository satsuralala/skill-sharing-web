const mongoose = require('mongoose');
import { model, models } from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reputation: { type: Number, default: 0 },
  });

export const userModel = models['user'] || model('user', userSchema);
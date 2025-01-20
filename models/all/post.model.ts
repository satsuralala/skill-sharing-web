const mongoose = require('mongoose');
import { model, models } from 'mongoose';
import { updatePost } from '../../resolvers/mutations';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  status: { type: String, default: 'pending' },
  likes: { type: Number, default: 0 },
  words:{ type: Number, default: 0 },
  readIn:{ type: Number, default: 0 },
  views:{ type: Number, default: 0 },
  images:[String],
  comments: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now }
});

export const postModel = models['post'] || model('post', postSchema);
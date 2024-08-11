import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  musicFile: {
    data: Buffer,
    contentType: String
  },
});

export default mongoose.model('Music', musicSchema)

/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';

interface CommentData {
  id: string;
  user: string;
  content: string;
  status: 'draft' | 'published' | 'trashed' | undefined;
  task: string;
}

const { Schema } = mongoose;
const CommentSchema = new Schema<CommentData>(
  {
    user: String,
    content: String,
    task: String,
    status: {
      type: String,
      enum: ['draft', 'published', 'trashed'],
      default: 'draft',
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export default mongoose.model('comment', CommentSchema);

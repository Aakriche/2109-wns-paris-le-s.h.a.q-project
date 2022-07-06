/* eslint-disable import/no-cycle */
import mongoose from "mongoose";

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
  role: 'admin' | 'developer' | 'project manager' | 'other' | undefined;
}

const { Schema } = mongoose;
const UserSchema = new Schema<UserData>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'developer', 'project manager', 'other'],
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export default mongoose.model('user', UserSchema);

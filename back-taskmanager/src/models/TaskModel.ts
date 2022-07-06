import mongoose from 'mongoose';
import { UserData } from './UserModel';
// eslint-disable-next-line import/no-cycle
// import { ProjectData } from './ProjectModel';

export interface TaskData {
  id: string | number;
  subject: string;
  description: string;
  project: string;
  user: string;
  status: string;
  priority: string;
  creator: keyof UserData['email'] | string;
  initial_time_estimation: number;
  time_spent: number;
  advancement: number;
  deadline: string;
}

const { Schema } = mongoose;
const TaskSchema = new Schema<TaskData>({
  subject: String,
  description: String,
  project: String,
  user: String,
  status: String,
  priority: String,
  creator: String,
  initial_time_estimation: Number,
  time_spent: Number,
  advancement: Number,
  deadline: String,
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model<TaskData>('task', TaskSchema);

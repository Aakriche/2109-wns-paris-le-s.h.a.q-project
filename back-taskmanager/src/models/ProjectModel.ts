/* eslint-disable import/no-cycle */
import mongoose from 'mongoose';
// import { TaskData } from './TaskModel';
import { UserData } from './UserModel';

export interface ProjectData {
  id: string | number;
  title: string;
  subject: string;
  projectOwner?: keyof UserData['email'] | string;
  tasks: string[];
  members: string[];
  user: string;
  creator: string;
  initial_time_estimation: number;
  spent_time: number;
  deadline: string;
}

const { Schema } = mongoose;
const ProjectSchema = new Schema<ProjectData>(
  {
    title: String,
    subject: String,
    projectOwner: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'task' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'user' }], 
    initial_time_estimation: Number,
    spent_time: Number,
    creator: String,
    user: String,
    deadline: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export default mongoose.model<ProjectData>('project', ProjectSchema);

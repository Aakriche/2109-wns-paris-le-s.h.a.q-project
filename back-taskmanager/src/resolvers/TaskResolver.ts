/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
// import { isAuth } from '../modules/middleware/isAuth';
import { JwtPayload } from "jsonwebtoken";
import { ApolloError } from "apollo-server";
import CreateTaskInput from "../entity/inputs/CreateTaskInput";
import UpdateTaskInput from "../entity/inputs/UpdateTaskInput";
import Task from "../entity/entities/Task";
import TaskModels from "../models/TaskModel";

@Resolver(Task)
class TaskResolver {
  // @Authorized()
  @Query(() => [Task])
  async allTasks() {
    const tasks = await TaskModels.find();
    return tasks;
  }

  @Mutation(() => Task)
  async createTask(
    @Ctx() ctx: JwtPayload,
    @Arg('input') createTaskInput: CreateTaskInput
  ) {
    try {
      const newTask = new TaskModels(createTaskInput);
      if (ctx && ctx.authenticatedUserEmail) {
        newTask.creator = ctx.authenticatedUserEmail;
        await newTask.save();
        return newTask;
      }
      return new ApolloError('Not Authorized');
    } catch (err) {
      return console.log(err);
    }
  }

  @Query(() => Task)
  findOneTaskById(@Arg('id') _id: string) {
    return TaskModels.findOne({ _id }).exec();
  }

  // Search Field
  @Query(() => [Task])
  async findTaskByKeyword(@Arg('searchField') SearchTaskInput: string) {
    const regex = new RegExp(`^${SearchTaskInput}$`, 'i');
    const taskList = await TaskModels.find({
      $or: [{ subject: regex }, { description: regex }, { status: regex }],
    }).exec();
    if (!TaskResolver) throw new Error('No result for your search!');
    return taskList;
  }

  @Mutation(() => Task)
  async editTaskById(
    @Ctx() ctx: JwtPayload,
    @Arg('id') _id: string,
    @Arg('data') data: UpdateTaskInput
  ) {
    if (ctx && ctx.authenticatedUserEmail) {
      const task = await TaskModels.findOne({ _id }).exec();
      if (!task) throw new Error('Task not found!');
      if (task?.creator !== ctx.authenticatedUserEmail || task?.user === 'admin' || task?.user === 'project manager') {
        return new ApolloError('Not Authorized');
      }
      if (task !== null && task !== undefined) {
        Object.assign(task, data);
        await task.save();
        return task;
      }
    }
    return new ApolloError('Not Authorized');
  }

  // TODO: create a mutation to delete many tasks at once

  @Mutation(() => Boolean)
  async deleteTaskById(@Ctx() ctx: JwtPayload, @Arg('id') _id: string) {
    if (ctx && ctx.authenticatedUserEmail) {
      const task = await TaskModels.findOne({ _id }).exec();
      if (!task) throw new Error('Task not found!');
      if (task?.creator === ctx.authenticatedUserEmail && task.user === 'admin' || task.user === 'project manager') {
        await task.remove();
      } else {
        return new ApolloError('Not Authorized'); 
      }
    }
    return new ApolloError('Not Authorized');
  }
}

export default TaskResolver;

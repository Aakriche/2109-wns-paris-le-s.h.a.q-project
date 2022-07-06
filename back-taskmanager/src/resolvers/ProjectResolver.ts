/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { Arg, Ctx, Mutation, Query, Resolver  } from 'type-graphql';
import { JwtPayload } from "jsonwebtoken";
import { ApolloError } from 'apollo-server';
import CreateProjectInput from '../entity/inputs/CreateProjectInput';
import UpdateProjectInput from '../entity/inputs/UpdateProjectInput';
import Project from '../entity/entities/Project';
import ProjectModel from '../models/ProjectModel';


@Resolver(Project)
class ProjectResolver {
    @Query(() => [Project])
    async allProjects() {
        const projects = await ProjectModel.find();
        return projects;
    }

    @Mutation(() => Project)
    async createProject(
      @Ctx() ctx: JwtPayload,
      @Arg('input') createProjectInput: CreateProjectInput
      ) { 
      try {
        const newProject = new ProjectModel(createProjectInput);
        if (ctx && ctx.authenticatedUserEmail) {
          newProject.creator = ctx.authenticatedUserEmail;
          await newProject.save();
          return newProject;
        }
        return new ApolloError('Not Authorized')
      } catch (err) {
        return console.log(err);
      }
    }

    @Mutation(() => Project)
    async updateProjectById(
      @Ctx() ctx: JwtPayload,
      @Arg('id') _id: string, 
      @Arg('data') data: UpdateProjectInput
      ) {
        if (ctx && ctx.authenticatedUserEmail) {
          const project = await ProjectModel.findOne({ _id }).exec();
          if (!project) throw new Error('Project not found!');
          if (project?.creator !== ctx.authenticatedUserEmail ||
             project?.user === 'admin' ||
             project?.user === 'project manager') {
            return new ApolloError('Not Authorized');
          }
          if (project !== null && project !== undefined) {
            Object.assign(project, data);
            await project.save();
            return project;
          }
        }
        return new ApolloError('Not Authorized');
    }

}

export default ProjectResolver;

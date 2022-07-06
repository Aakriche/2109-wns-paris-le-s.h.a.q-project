/* eslint-disable import/no-cycle */
import { ID, ObjectType, Field } from 'type-graphql';
// import Task from './Task';
import User from './User';

@ObjectType()
class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  title?: string;

  @Field()
  subject?: string;

  // @Field(() => String)
  // projectOwner?: keyof User['email'] | string;

  @Field(() => [ID])
  members?: string[];

  @Field(() => [ID])
  tasks?: string[];

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field(() => String)
  creator?: keyof User['email'] | string;

  @Field({ nullable: true })
  initial_time_estimation?: number;

  @Field({ nullable: true })
  spent_time?: number;

  @Field({ nullable: true })
  deadline?: string;
}

export default Project;

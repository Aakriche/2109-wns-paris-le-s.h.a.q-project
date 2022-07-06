import { ID, Field, InputType } from 'type-graphql';
import User from '../entities/User';

@InputType()
export default class CreateProjectInput {
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
  user!: string;

  @Field(() => String)
  creator?: keyof User['email'] | string;

  @Field({ nullable: true })
  initial_time_estimation?: number;

  @Field({ nullable: true })
  spent_time?: number;

  @Field({ nullable: true })
  deadline?: string;
}

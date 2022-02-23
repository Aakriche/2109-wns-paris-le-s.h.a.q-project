import { ID, ObjectType, Field } from 'type-graphql';
import User from './User';

@ObjectType()
export default class Task {
  @Field(() => ID)
  id!: string;

  @Field(() => User)
  user!: User;

  @Field(() => String)
  subject!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => String)
  project!: string;

  @Field(() => String)
  status!: string;

  @Field(() => String)
  assignee!: string;

  @Field(() => String)
  dueDate!: string;
}

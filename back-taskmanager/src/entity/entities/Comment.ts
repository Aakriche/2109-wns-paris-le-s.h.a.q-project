import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default class Comment {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  user!: string;

  @Field()
  content!: string;

  @Field(() => ID)
  task?: string;

  @Field()
  status?: string;

}

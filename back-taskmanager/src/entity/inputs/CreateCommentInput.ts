import { InputType, Field, ID } from 'type-graphql';

@InputType()
export default class CreateCommentInput {

  @Field(() => ID)
  user!: string;

  @Field()
  content!: string;

  @Field()
  task?: string;

  @Field()
  status?: string;

}

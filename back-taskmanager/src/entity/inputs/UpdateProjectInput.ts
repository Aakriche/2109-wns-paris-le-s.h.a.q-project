import { ID, Field, InputType } from 'type-graphql';
// import User from '../entities/User'

@InputType()
export default class UpdateProjectInput {
    @Field({ nullable: true })
    title?: string;
  
    @Field({ nullable: true })
    subject?: string;
  
    // @Field(() => String, { nullable: true })
    // projectOwner?: keyof User['email'] | string;
  
    @Field(() => [ID], { nullable: true })
    members?: string[];
  
    @Field(() => [ID], { nullable: true })
    tasks?: string[];

    @Field(() => ID, { nullable: true })
    user?: string;

    @Field({ nullable: true })
    creator?: string;

    @Field({ nullable: true })
    initial_time_estimation?: number;
  
    @Field({ nullable: true })
    spent_time?: number;
  
    @Field({ nullable: true })
    deadline?: string;
  }
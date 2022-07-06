/* eslint-disable import/no-cycle */
import { Field, ID, ObjectType } from "type-graphql";
// import Project from "./Project";
import User from "./User";

// role.admin
// role.project manager

@ObjectType()
export default class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  subject!: string;

  @Field()
  description!: string;

  @Field(() => ID, { nullable: true })
  project!: string;

  @Field(() => ID, { nullable: true })
  user!: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  priority?: string;


  @Field(() => String)
  creator!: keyof User['email'];

  @Field({ nullable: true })
  initial_time_estimation?: number;

  @Field({ nullable: true })
  initial_time_spent?: number;

  @Field({ nullable: true })
  advancement?: number;

  @Field({ nullable: true })
  deadline?: string;

  /*   @Field()
  document_upload?: String; */
}

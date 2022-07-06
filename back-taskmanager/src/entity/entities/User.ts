import { ID, ObjectType, Field } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  role?: string;
}

export default User;

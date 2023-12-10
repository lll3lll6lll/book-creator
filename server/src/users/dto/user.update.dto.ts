import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdate {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;
}

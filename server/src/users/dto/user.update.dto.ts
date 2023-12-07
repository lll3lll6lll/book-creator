import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdate {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;
}

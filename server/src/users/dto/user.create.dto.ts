import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreate {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;
}

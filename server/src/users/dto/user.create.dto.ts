import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreate {
  @Field()
  email: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  password: string;
}

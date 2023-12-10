import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreate {
  @Field()
  email: string;

  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;
}

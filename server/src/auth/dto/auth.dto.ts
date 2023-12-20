import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class AuthDto {
  @Field()
  email: string;

  @Field()
  password: string;
}

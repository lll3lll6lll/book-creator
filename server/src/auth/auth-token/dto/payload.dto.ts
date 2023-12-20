import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class TokenPayloadDto {
  @Field()
  user_id: number;

  @Field()
  email: string;
}

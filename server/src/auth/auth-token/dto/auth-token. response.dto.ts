import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class AuthTokenResponseDto {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}

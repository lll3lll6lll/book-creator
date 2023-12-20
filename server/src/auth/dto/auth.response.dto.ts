import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@src/users/entities/user.entity';
import { AuthTokenResponseDto } from '@src/auth/auth-token/dto/auth-token. response.dto';
@ObjectType()
export class AuthResponseDto {
  @Field()
  tokens: AuthTokenResponseDto;

  @Field()
  user: User;
}

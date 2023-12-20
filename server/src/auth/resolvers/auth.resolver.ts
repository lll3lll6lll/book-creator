import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from '@src/auth/services/auth.service';
import { AuthDto } from '@src/auth/dto/auth.dto';
import { AuthResponseDto } from '@src/auth/dto/auth.response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  async registration(
    @Context() context: GraphQLExecutionContext,
    @Args({ name: 'dto', type: () => AuthDto }) dto: AuthDto,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.registration(dto);

    // @ts-expect-error res?
    context.res.header('authorization', 'Bearer ' + result.tokens.accessToken);
    // @ts-expect-error res?
    context.res.cookie('refreshToken', result.tokens.refreshToken);

    return result;
  }
  @Mutation(() => AuthResponseDto)
  async login(
    @Args({ name: 'dto', type: () => AuthDto }) dto: AuthDto,
    @Context() context: GraphQLExecutionContext,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(dto);

    // @ts-expect-error res?
    context.res.header('authorization', 'Bearer ' + result.tokens.accessToken);
    // @ts-expect-error res?
    context.res.cookie('refreshToken', result.tokens.refreshToken);

    return result;
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: GraphQLExecutionContext) {
    // @ts-expect-error res?
    context.res.header('authorization', '');
    // @ts-expect-error res?
    context.res.cookie('refreshToken', '');
    return true;
  }

  // @Query()
  // async refresh() {}
  //
  // @Query()
  // async getActivateLink() {}
}

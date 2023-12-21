import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from '@src/auth/dto/auth.dto';
import { UsersService } from '@src/users/services/users.service';
import { AuthTokenService } from '@src/auth/auth-token/services/token.service';
import { AuthResponseDto } from '@src/auth/dto/auth.response.dto';
import { AppContextService } from '@src/shared/app-context/app.context.service';
import { AuthTokenResponseDto } from '@src/auth/auth-token/dto/auth-token. response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: AuthTokenService,
    private readonly appContextService: AppContextService,
  ) {}

  async registration(dto: AuthDto): Promise<AuthResponseDto> {
    const candidate = await this.usersService.getByEmail(dto.email);
    if (candidate) {
      throw new BadRequestException('User with such email is already exist');
    }

    const user = await this.usersService.save({ ...dto });
    const tokens = await this.tokenService.getCreatedTokens(
      { user_id: user.id },
      { user_id: user.id, email: user.email },
    );

    return { user, tokens };
  }

  async login(dto: AuthDto): Promise<AuthResponseDto> {
    const user = await this.usersService.validateUser(dto.email, dto.password);
    const tokens = await this.tokenService.getUpdateTokens(
      { user_id: user.id },
      { user_id: user.id, email: user.email },
    );
    return { user, tokens };
  }

  async logout() {}

  async refreshTokens(): Promise<AuthTokenResponseDto> {
    const cookie = this.appContextService.getContext()?.cookie;
    const token = cookie?.refreshToken;

    if (!token || this.tokenService.isValidRefreshToken(token)) {
      throw new UnauthorizedException();
    }

    const data = this.tokenService.getTokenPayload(token);

    return await this.tokenService.getUpdateTokens(
      { user_id: data.user_id },
      {
        email: data.email,
        user_id: data.user_id,
      },
    );
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from '@src/auth/dto/auth.dto';
import { UsersService } from '@src/users/services/users.service';
import { AuthTokenService } from '@src/auth/auth-token/services/token.service';
import { UniqueTokenQueryDto } from '@src/auth/auth-token/dto/unique-token.query.dto';
import { TokenPayloadDto } from '@src/auth/auth-token/dto/payload.dto';
import { AuthResponseDto } from '@src/auth/dto/auth.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: AuthTokenService,
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

  async getRefresh(criteria: UniqueTokenQueryDto, payload: TokenPayloadDto) {
    return await this.tokenService.getUpdateTokens(criteria, payload);
  }
}

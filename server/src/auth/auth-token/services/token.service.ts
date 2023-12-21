import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthToken } from '@src/auth/auth-token/entities/auth-token.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '@src/auth/auth-token/dto/payload.dto';
import { UniqueTokenQueryDto } from '@src/auth/auth-token/dto/unique-token.query.dto';
import { AuthTokenResponseDto } from '@src/auth/auth-token/dto/auth-token. response.dto';
import { ConfigService } from '@nestjs/config';
// import * as process from 'process';

@Injectable()
export class AuthTokenService {
  private accessSecret: string;
  private accessExpiresIn: string;
  private refreshSecret: string;
  private refreshExpiresIn: string;
  constructor(
    @InjectRepository(AuthToken)
    private readonly authTokenRepository: Repository<AuthToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
    this.accessExpiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRED');
    this.refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
    this.refreshExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_EXPIRED',
    );
  }

  isValidAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: this.accessSecret,
    });
  }
  isValidRefreshToken(token) {
    return this.jwtService.verify(token, {
      secret: this.refreshSecret,
    });
  }
  getTokenPayload(token: string): TokenPayloadDto {
    return this.jwtService.decode(token);
  }

  private async genAccessToken(payload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRED'),
    });
  }

  private async genRefreshToken(payload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRED'),
    });
  }

  private async genTokens(payload): Promise<AuthTokenResponseDto> {
    const accessToken = await this.genAccessToken(payload);
    const refreshToken = await this.genRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  async getCreatedTokens(
    criteria: UniqueTokenQueryDto,
    payload: TokenPayloadDto,
  ): Promise<AuthTokenResponseDto> {
    const tokens = await this.genTokens(payload);
    await this.save({ ...criteria, refresh: tokens.refreshToken });
    return tokens;
  }
  private async save(
    dto: UniqueTokenQueryDto & { refresh: string },
  ): Promise<AuthToken> {
    return await this.authTokenRepository.save({ ...dto });
  }
  async getUpdateTokens(
    criteria: UniqueTokenQueryDto,
    payload: TokenPayloadDto,
  ): Promise<AuthTokenResponseDto> {
    const tokens = await this.genTokens(payload);
    await this.update(criteria, tokens.refreshToken);
    return { ...tokens };
  }

  private async update(criteria: UniqueTokenQueryDto, refreshToken: string) {
    await this.authTokenRepository.update(
      { ...criteria },
      { refresh: refreshToken },
    );
    return await this.getOne(criteria);
  }

  async getOne(dto: UniqueTokenQueryDto): Promise<AuthToken> {
    return await this.authTokenRepository.findOneBy({ ...dto });
  }

  async remove(dto: UniqueTokenQueryDto): Promise<number> {
    await this.authTokenRepository.delete({ user_id: dto.user_id });
    return dto.user_id;
  }
}

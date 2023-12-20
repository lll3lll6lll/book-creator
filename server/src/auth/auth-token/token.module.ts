import { Module } from '@nestjs/common';
import { AuthTokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from '@src/auth/auth-token/entities/auth-token.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthToken]),
    JwtModule.register({
      secret: 'sssss -ddd', //jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthTokenService],
  exports: [AuthTokenService],
})
export class TokenModule {}

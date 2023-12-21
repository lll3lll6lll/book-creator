import { Module } from '@nestjs/common';
import { TokenModule } from './auth-token/token.module';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Module({
  imports: [TokenModule, UsersModule, PassportModule],
  providers: [AuthService, AuthResolver, LocalAuthStrategy, LocalAuthGuard],
})
export class AuthModule {}

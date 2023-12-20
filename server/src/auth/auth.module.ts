import { Module } from '@nestjs/common';
import { TokenModule } from './auth-token/token.module';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [TokenModule, UsersModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}

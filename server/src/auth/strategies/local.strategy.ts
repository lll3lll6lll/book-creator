import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@src/users/services/users.service';
import { User } from '@src/users/entities/user.entity';
@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      email: 'email',
    });
  }
  async validate(email: string, password: string): Promise<User | null> {
    return this.usersService.validateUser(email, password);
  }
}

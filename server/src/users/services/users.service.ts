import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreate } from '../dto/user.create.dto';
import { UserUpdate } from '../dto/user.update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userCreate: UserCreate): Promise<User> {
    return await this.userRepository.save({ ...userCreate });
  }

  async getOneUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(userUpdate: UserUpdate): Promise<User> {
    await this.userRepository.update({ id: userUpdate.id }, { ...userUpdate });
    return await this.getOneUser(userUpdate.id);
  }
}

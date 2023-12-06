import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../inputs/user-create.input';
import { UpdateUserInput } from '../inputs/user-update.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.save({ ...createUserInput });
  }

  async getOneUser(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async removeUser(id: string): Promise<string> {
    await this.userRepository.delete({ id });
    return id;
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );
    return await this.getOneUser(updateUserInput.id);
  }
}

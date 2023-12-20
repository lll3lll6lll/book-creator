import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreate } from '../dto/user.create.dto';
import { UserUpdate } from '../dto/user.update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userCreate: UserCreate): Promise<User> {
    return await this.userRepository.save({ ...userCreate });
  }

  async save({ email, password }): Promise<User> {
    const hashPass = bcrypt.hashSync(password, 7);
    return await this.userRepository.save({ email, password: hashPass });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.getUserPasswordByEmail(email);
    if (!user) {
      throw new BadRequestException('Пользователь с таким email не найден');
    }

    const isPassEquals = bcrypt.compareSync(password, user.password);
    if (!isPassEquals) {
      throw new BadRequestException('Неверный пароль');
    }

    return await this.getByEmail(email);
  }

  async getUserPasswordByEmail(email): Promise<Pick<User, 'password'>> {
    return await this.userRepository.findOne({
      select: { password: true },
      where: { email },
    });
  }

  async remove(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  async update(userUpdate: UserUpdate): Promise<User> {
    await this.userRepository.update({ id: userUpdate.id }, { ...userUpdate });
    return await this.getById(userUpdate.id);
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }
}

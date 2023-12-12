import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { User } from '@src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UserCreate } from '@src/users/dto/user.create.dto';
import { UserUpdate } from '@src/users/dto/user.update.dto';

export class UsersTestFabric {
  private users: User[] = [];
  private rep: Repository<User>;
  constructor(client: DataSource | EntityManager) {
    this.rep = client.getRepository(User);
  }

  async getOne(): Promise<User> {
    const obj: UserCreate = {
      email: faker.internet.email(),
      first_name: faker.lorem.sentence(3),
      last_name: faker.lorem.sentence(3),
    };
    const user = await this.rep.save(obj);
    this.users.push(user);
    return user;
  }

  getUpdates(): Omit<Required<UserUpdate>, 'id'> {
    return {
      email: faker.internet.email(),
      first_name: faker.lorem.sentence(3),
      last_name: faker.lorem.sentence(3),
    };
  }

  getCreates(): Required<UserCreate> {
    return {
      email: faker.internet.email(),
      first_name: faker.lorem.sentence(3),
      last_name: faker.lorem.sentence(3),
    };
  }

  async clean() {
    await this.rep.delete(this.users.map((i) => i.id));
    this.users = [];
  }
}

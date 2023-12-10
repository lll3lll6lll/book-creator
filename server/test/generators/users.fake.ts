import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { User } from '@src/users/entities/user.entity';

export function genFakeUser(params: Partial<User> = {}): User {
  const user = new User();

  user.id = +faker.string.numeric(7);
  user.first_name = faker.person.firstName();
  user.last_name = faker.person.lastName();
  user.email = faker.internet.email();

  Object.assign(user, params);

  return user;
}

export async function saveFakeUser(
  client: DataSource | EntityManager,
  obj: Partial<User> = {},
): Promise<User> {
  return client.getRepository(User).save(obj);
}

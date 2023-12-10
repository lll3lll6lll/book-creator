import { UsersService } from './users.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { genFakeUser } from '@test/generators/users.fake';
import { faker } from '@faker-js/faker';
import { UsersModule } from '@src/users/users.module';

let nestApp: INestApplication;
let service: UsersService;
describe('UsersService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [UsersModule],
    });

    nestApp = app;
    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => await nestApp.close());

  it('UsersService: should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Users: CRUD', async () => {
    const fake = genFakeUser();
    const user = await service.createUser(fake);

    const actual1 = await service.getOneUser(user.id);
    expect(actual1).toEqual(user);

    user.email = faker.internet.email();
    user.first_name = faker.person.firstName();
    user.last_name = faker.person.lastName();

    await service.updateUser(user);
    const actual2 = await service.getOneUser(user.id);
    expect(actual2).toEqual(user);

    await service.removeUser(user.id);
    const actual3 = await service.getOneUser(user.id);
    expect(actual3).toBeNull();
  });
});

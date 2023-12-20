import { UsersService } from './users.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { UsersTestFabric } from '@test/generators/users.fake';
import { UsersModule } from '@src/users/users.module';
import { DataSource } from 'typeorm';

let nestApp: INestApplication;
let service: UsersService;
let client: DataSource;

describe('UsersService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [UsersModule],
    });

    nestApp = app;
    service = module.get<UsersService>(UsersService);
    client = module.get(DataSource);
  });

  afterAll(async () => await nestApp.close());

  it('UsersService: should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Users: CRUD', async () => {
    const usersFabric = new UsersTestFabric(client);
    const user = await service.createUser(usersFabric.getCreates());

    const actual1 = await service.getById(user.id);
    expect(actual1).toEqual(user);

    const updates = usersFabric.getUpdates();
    Object.assign(user, updates);

    await service.update(user);
    const actual2 = await service.getById(user.id);
    expect(actual2).toEqual(user);

    await service.remove(user.id);
    const actual3 = await service.getById(user.id);
    expect(actual3).toBeNull();
  });
});

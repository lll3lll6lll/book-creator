import { UsersResolver } from '@src/users/resolvers/users.resolver';
import { INestApplication } from '@nestjs/common';
import { initTestNest } from '@test/utils/test.utils';
import { UsersModule } from '@src/users/users.module';

let nestApp: INestApplication;
let resolver: UsersResolver;
describe('UsersResolver', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [UsersModule],
    });

    nestApp = app;
    resolver = module.get<UsersResolver>(UsersResolver);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

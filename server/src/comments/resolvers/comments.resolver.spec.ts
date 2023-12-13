import { CommentsResolver } from './comments.resolver';
import { initTestNest } from '@test/utils/test.utils';
import { CommentsModule } from '@src/comments/comments.module';
import { INestApplication } from '@nestjs/common';

let nestApp: INestApplication;
let resolver: CommentsResolver;
describe('CommentsResolver', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [CommentsModule],
    });

    nestApp = app;
    resolver = module.get<CommentsResolver>(CommentsResolver);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { ChaptersResolver } from './chapters.resolver';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { ChaptersModule } from '@src/chapters/chapters.module';

let nestApp: INestApplication;
let resolver: ChaptersResolver;
describe('ChapterResolver', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [ChaptersModule],
    });

    nestApp = app;
    resolver = module.get<ChaptersResolver>(ChaptersResolver);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

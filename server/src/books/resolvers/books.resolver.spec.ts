import { BooksResolver } from './books.resolver';
import { initTestNest } from '@test/utils/test.utils';
import { BooksModule } from '@src/books/books.module';
import { INestApplication } from '@nestjs/common';

let nestApp: INestApplication;
let resolver: BooksResolver;
describe('BooksResolver', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [BooksModule],
    });

    nestApp = app;
    resolver = module.get<BooksResolver>(BooksResolver);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

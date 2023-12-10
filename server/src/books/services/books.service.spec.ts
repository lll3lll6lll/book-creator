import { BooksService } from './books.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { BooksModule } from '@src/books/books.module';
import { faker } from '@faker-js/faker';
import { genFakeBook } from '@test/generators/books.fake';

let nestApp: INestApplication;
let service: BooksService;
describe('BooksService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [BooksModule],
    });

    nestApp = app;
    service = module.get<BooksService>(BooksService);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Books: CRUD', async () => {
    const fake = genFakeBook();
    const book = await service.createBook(fake);

    const actual1 = await service.getOneBook(book.id);
    expect(actual1).toEqual(book);

    book.title = faker.lorem.sentence(3);

    await service.updateBook(book);
    const actual2 = await service.getOneBook(book.id);
    expect(actual2).toEqual(book);

    await service.removeBook(book.id);
    const actual3 = await service.getOneBook(book.id);
    expect(actual3).toBeNull();
  });
});

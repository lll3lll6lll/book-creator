import { BooksService } from './books.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { BooksModule } from '@src/books/books.module';
import { TestEntitiesFabric } from '@test/generators/TestEntitiesFabric';
import { DataSource } from 'typeorm';

let nestApp: INestApplication;
let service: BooksService;
let client: DataSource;
describe('BooksService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [BooksModule],
    });

    nestApp = app;
    service = module.get<BooksService>(BooksService);
    client = module.get(DataSource);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Books: CRUD', async () => {
    const fabric = new TestEntitiesFabric(client);
    await fabric.createSet();

    const obj = fabric.books.getCreates();
    const book = await service.createBook(obj);

    const actual1 = await service.getOneBook(book.id);
    expect(actual1).toEqual(book);

    const updates = fabric.books.getUpdates();
    Object.assign(book, updates);

    await service.updateBook(book);
    const actual2 = await service.getOneBook(book.id);
    expect(actual2).toEqual(book);

    await service.removeBook(book.id);
    const actual3 = await service.getOneBook(book.id);
    expect(actual3).toBeNull();

    await fabric.clean();
  });
});

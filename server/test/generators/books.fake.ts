import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { Book } from '@src/books/entities/book.entity';

export function genFakeBook(params: Partial<Book> = {}): Book {
  const book = new Book();

  book.id = +faker.string.numeric(7);
  book.title = faker.lorem.sentence(3);
  book.ownerId = +faker.string.numeric(3);

  Object.assign(book, params);

  return book;
}

export async function saveFakeBook(
  client: DataSource | EntityManager,
  obj: Partial<Book> = {},
): Promise<Book> {
  return client.getRepository(Book).save(obj);
}

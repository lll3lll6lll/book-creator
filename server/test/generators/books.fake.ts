import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { Book } from '@src/books/entities/book.entity';
import { BookCreate } from '@src/books/dto/book.create.dto';
import { Repository } from 'typeorm/repository/Repository';
import { BookUpdate } from '@src/books/dto/book.update.dto';

export class BooksTestFabric {
  private user_id: number;
  private books: Book[] = [];
  private rep: Repository<Book>;
  constructor(client: DataSource | EntityManager) {
    this.rep = client.getRepository(Book);
  }

  setDependencies(dep: { user_id: number }) {
    this.user_id = dep.user_id;
  }

  async getOne(): Promise<Book> {
    if (!this.user_id) {
      throw Error(' Set dependencies (external key) to create entity of book ');
    }

    const obj: BookCreate = {
      owner_id: this.user_id,
      title: faker.lorem.sentence(3),
    };
    const book = await this.rep.save(obj);
    this.books.push(book);
    return book;
  }

  getUpdates(): Omit<Required<BookUpdate>, 'id'> {
    return {
      title: faker.lorem.sentence(3),
    };
  }

  getCreates(): Required<BookCreate> {
    return {
      title: faker.lorem.sentence(3),
      owner_id: this.user_id,
    };
  }

  async clean() {
    await this.rep.delete(this.books.map((i) => i.id));
    this.books = [];
  }
}

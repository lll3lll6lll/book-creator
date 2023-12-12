import { DataSource, EntityManager } from 'typeorm';
import { BooksTestFabric } from '@test/generators/books.fake';
import { UsersTestFabric } from '@test/generators/users.fake';
import { ChaptersTestFabric } from '@test/generators/chapters.fake';
import { CommentsTestFabric } from '@test/generators/comment.fake';

export class TestEntitiesFabric {
  readonly books: BooksTestFabric;
  readonly users: UsersTestFabric;
  readonly chapters: ChaptersTestFabric;
  readonly comments: CommentsTestFabric;
  constructor(client: DataSource | EntityManager) {
    this.users = new UsersTestFabric(client);
    this.books = new BooksTestFabric(client);
    this.chapters = new ChaptersTestFabric(client);
    this.comments = new CommentsTestFabric(client);
  }

  async createSet() {
    const user = await this.users.getOne();

    this.books.setDependencies({ user_id: user.id });
    const book = await this.books.getOne();

    this.chapters.setDependencies({ book_id: book.id });
    const chapter = await this.chapters.getOne();

    this.comments.setDependencies({ book_id: book.id, chapter_id: chapter.id });
    const comment = await this.comments.getOne();

    return { user, book, chapter, comment };
  }
  async clean() {
    await Promise.all([
      this.users.clean(),
      this.books.clean(),
      this.comments.clean(),
      this.comments.clean(),
    ]);
  }
}

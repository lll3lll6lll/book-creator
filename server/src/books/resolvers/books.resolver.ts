import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from '../services/books.service';
import { BookCreate } from '../dto/book.create.dto';
import { Book } from '../entities/book.entity';
import { BookUpdate } from '../dto/book.update.dto';

@Resolver()
export class BooksResolver {
  constructor(private readonly bookService: BooksService) {}

  @Mutation(() => Book)
  async createBook(
    @Args({ name: 'dto', type: () => BookCreate })
    bookCreate: BookCreate,
  ): Promise<Book> {
    return await this.bookService.createBook(bookCreate);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args({ name: 'dto', type: () => BookUpdate })
    bookUpdate: BookUpdate,
  ): Promise<Book> {
    return await this.bookService.updateBook(bookUpdate);
  }

  @Mutation(() => Number)
  async removeBook(@Args('id') id: number): Promise<number> {
    return await this.bookService.removeBook(id);
  }

  @Query(() => Book)
  async getOneBook(@Args('id') id: number): Promise<Book> {
    return await this.bookService.getOneBook(id);
  }
}

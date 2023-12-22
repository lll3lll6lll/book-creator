import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BooksService } from '../services/books.service';
import { BookCreate } from '../dto/book.create.dto';
import { Book } from '../entities/book.entity';
import { BookUpdate } from '../dto/book.update.dto';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { ChaptersService } from '@src/chapters/services/chapters.service';
import { Comment } from '@src/comments/entities/comment.entity';
import { CommentsService } from '@src/comments/services/comments.service';
import { Public } from '../../shared/decorators';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly bookService: BooksService,
    private readonly chaptersService: ChaptersService,
    private readonly commentsService: CommentsService,
  ) {}

  @Mutation(() => Book)
  async createBook(
    @Args({ name: 'dto', type: () => BookCreate })
    bookCreate: BookCreate,
  ): Promise<Book> {
    return await this.bookService.create(bookCreate);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args({ name: 'dto', type: () => BookUpdate })
    bookUpdate: BookUpdate,
  ): Promise<Book> {
    return await this.bookService.update(bookUpdate);
  }

  @Mutation(() => Number)
  async removeBook(@Args('id') id: number): Promise<number> {
    return await this.bookService.remove(id);
  }

  @Public()
  @Query(() => Book)
  async getOneBook(@Args('id') id: number): Promise<Book> {
    return await this.bookService.getById(id);
  }

  @Public()
  @ResolveField('chapters', () => [Chapter])
  async getChapters(@Parent() book: Book) {
    const { id } = book;
    return this.chaptersService.getBookChapters(id);
  }
  @Public()
  @ResolveField('comments', () => [Comment])
  async getComments(@Parent() book: Book) {
    const { id } = book;
    return this.commentsService.getBookComments(id);
  }
}

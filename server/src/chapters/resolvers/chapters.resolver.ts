import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { ChaptersService } from '@src/chapters/services/chapters.service';
import { ChapterUpdate } from '@src/chapters/dto/chapter.update.dto';
import { ChapterCreate } from '@src/chapters/dto/chapter.create.dto';
import { BooksService } from '@src/books/services/books.service';
import { Book } from '@src/books/entities/book.entity';
import { Comment } from '@src/comments/entities/comment.entity';
import { CommentsService } from '@src/comments/services/comments.service';

@Resolver(() => Chapter)
export class ChaptersResolver {
  constructor(
    private readonly chaptersService: ChaptersService,
    private readonly booksService: BooksService,
    private readonly commentsService: CommentsService,
  ) {}

  @Mutation(() => Chapter)
  async createChapter(
    @Args({ name: 'dto', type: () => ChapterCreate })
    chapterCreate: ChapterCreate,
  ): Promise<Chapter> {
    return await this.chaptersService.createChapter(chapterCreate);
  }

  @Mutation(() => Chapter)
  async updateChapter(
    @Args({ name: 'dto', type: () => ChapterUpdate })
    chapterUpdate: ChapterUpdate,
  ): Promise<Chapter> {
    return await this.chaptersService.updateChapter(chapterUpdate);
  }

  @Mutation(() => Number)
  async removeChapter(@Args('id') id: number): Promise<number> {
    return await this.chaptersService.removeChapter(id);
  }

  @Query(() => Chapter)
  async getOneChapter(@Args('id') id: number): Promise<Chapter> {
    return await this.chaptersService.getOneChapter(id);
  }

  @Query(() => [Chapter])
  async getChaptersOfBook(
    @Args('book_id') book_id: number,
  ): Promise<Chapter[]> {
    return await this.chaptersService.getBookChapters(book_id);
  }

  @ResolveField('book', () => Book)
  async getBook(@Parent() chapter: Chapter) {
    const { book_id } = chapter;
    return this.booksService.getOneBook(book_id);
  }

  @ResolveField('comments', () => [Comment])
  async getComments(@Parent() chapter: Chapter) {
    const { id } = chapter;
    return this.commentsService.getCommentsForChapter(id);
  }
}

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
import { Public } from '../../shared/decorators';

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
    return await this.chaptersService.create(chapterCreate);
  }

  @Mutation(() => Chapter)
  async updateChapter(
    @Args({ name: 'dto', type: () => ChapterUpdate })
    chapterUpdate: ChapterUpdate,
  ): Promise<Chapter> {
    return await this.chaptersService.update(chapterUpdate);
  }

  @Mutation(() => Number)
  async removeChapter(@Args('id') id: number): Promise<number> {
    return await this.chaptersService.remove(id);
  }

  @Public()
  @Query(() => Chapter)
  async getOneChapter(@Args('id') id: number): Promise<Chapter> {
    return await this.chaptersService.getById(id);
  }

  @Public()
  @Query(() => [Chapter])
  async getBookChapters(@Args('book_id') book_id: number): Promise<Chapter[]> {
    return await this.chaptersService.getBookChapters(book_id);
  }

  @Public()
  @ResolveField('book', () => Book)
  async getBook(@Parent() chapter: Chapter) {
    const { book_id } = chapter;
    return this.booksService.getById(book_id);
  }
  @Public()
  @ResolveField('comments', () => [Comment])
  async getComments(@Parent() chapter: Chapter) {
    const { id } = chapter;
    return this.commentsService.getChapterComments(id);
  }
}

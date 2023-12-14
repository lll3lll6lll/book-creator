import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentCreate } from '../dto/comment.create.dto';
import { CommentUpdate } from '../dto/comment.update.dto';
import { CommentsService } from '@src/comments/services/comments.service';
import { Comment } from '@src/comments/entities/comment.entity';
import { Book } from '@src/books/entities/book.entity';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { BooksService } from '@src/books/services/books.service';
import { ChaptersService } from '@src/chapters/services/chapters.service';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly booksService: BooksService,
    private readonly chaptersService: ChaptersService,
  ) {}

  @Mutation(() => Comment)
  async createComment(
    @Args({ name: 'dto', type: () => CommentCreate })
    commentCreate: CommentCreate,
  ): Promise<Comment> {
    return await this.commentsService.createComment(commentCreate);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args({ name: 'dto', type: () => CommentUpdate })
    commentUpdate: CommentUpdate,
  ): Promise<Comment> {
    return await this.commentsService.updateComment(commentUpdate);
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.commentsService.removeComment(id);
  }

  @Query(() => Comment)
  async getOneComment(@Args('id') id: number): Promise<Comment> {
    return await this.commentsService.getOneComment(id);
  }

  @Query(() => [Comment])
  async getChapterComments(
    @Args('chapter_id') chapter_id: number,
  ): Promise<Comment> {
    return await this.commentsService.getOneComment(chapter_id);
  }

  @Query(() => [Comment])
  async getBookComments(@Args('book_id') book_id: number): Promise<Comment[]> {
    return await this.commentsService.getBookComments(book_id);
  }

  @ResolveField('book', () => Book)
  async getBook(@Parent() comment: Comment) {
    const { book_id } = comment;
    return this.booksService.getOneBook(book_id);
  }

  @ResolveField('chapter', () => Chapter)
  async getChapter(@Parent() comment: Comment) {
    const { chapter_id } = comment;
    return this.chaptersService.getOneChapter(chapter_id);
  }
}

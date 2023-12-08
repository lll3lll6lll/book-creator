import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentCreate } from '../dto/comment.create.dto';
import { CommentUpdate } from '../dto/comment.update.dto';
import { CommentsService } from '@src/comments/services/comments.service';
import { Comment } from '@src/comments/entities/comment.entity';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

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
  async getOneUser(@Args('id') id: number): Promise<Comment> {
    return await this.commentsService.getOneComment(id);
  }
}

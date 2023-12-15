import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentCreate } from '@src/comments/dto/comment.create.dto';
import { Comment } from '@src/comments/entities/comment.entity';
import { CommentUpdate } from '@src/comments/dto/comment.update.dto';
// import { CommentCreatedEvent } from '@src/comments/events/comment-created.event';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createComment(createParam: CommentCreate): Promise<Comment> {
    const { parent_id, ...param } = createParam;
    const parents = [];
    if (parent_id) {
      const parentComment = await this.getOneComment(parent_id);
      parentComment.parents && parents.push(...parentComment.parents);
      parents.push(parent_id);
    }

    const res = await this.commentRepository.save({
      ...param,
      parents: parents.length ? parents : null,
    });

    // const commentCreated = new CommentCreatedEvent();
    // commentCreated.comment = res;
    this.eventEmitter.emit('comment.created', { comment: res });

    return res;
  }

  async getOneComment(id: number): Promise<Comment> {
    return await this.commentRepository.findOneBy({ id });
  }

  async removeComment(id: number): Promise<number> {
    await this.commentRepository.delete({ id });
    return id;
  }

  async updateComment(commentUpdate: CommentUpdate): Promise<Comment> {
    await this.commentRepository.update(
      { id: commentUpdate.id },
      { ...commentUpdate },
    );
    return await this.getOneComment(commentUpdate.id);
  }

  async getBookComments(book_id: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ book_id, chapter_id: null });
  }

  async getChapterComments(chapter_id: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ chapter_id });
  }
}

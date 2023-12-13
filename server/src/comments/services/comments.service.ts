import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentCreate } from '@src/comments/dto/comment.create.dto';
import { Comment } from '@src/comments/entities/comment.entity';
import { CommentUpdate } from '@src/comments/dto/comment.update.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(createParam: CommentCreate): Promise<Comment> {
    const { parent_id, ...param } = createParam;
    const parents = [];
    if (parent_id) {
      const parentComment = await this.getOneComment(parent_id);
      parentComment.parents && parents.push(...parentComment.parents);
      parents.push(parent_id);
    }

    return await this.commentRepository.save({
      ...param,
      parents: parents.length ? parents : null,
    });
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

  async getCommentsForBook(book_id: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ book_id, chapter_id: null });
  }

  async getCommentsForChapter(chapter_id: number): Promise<Comment[]> {
    return await this.commentRepository.findBy({ chapter_id });
  }
}

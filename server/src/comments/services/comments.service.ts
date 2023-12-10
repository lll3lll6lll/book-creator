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

  async createComment(commentCreate: CommentCreate): Promise<Comment> {
    return await this.commentRepository.save({ ...commentCreate });
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
}

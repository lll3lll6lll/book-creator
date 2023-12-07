import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentCreate } from '../dto/comment.create.dto';
import { CommentUpdate } from '../dto/comment.update.dto';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(commentCreate: CommentCreate): Promise<Comment> {
    return await this.commentRepository.save({ ...commentCreate });
  }

  async getOneComment(id: string): Promise<Comment> {
    return await this.commentRepository.findOneBy({ id });
  }

  async removeComment(id: string): Promise<string> {
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

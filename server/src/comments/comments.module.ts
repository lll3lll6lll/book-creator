import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsResolver } from './resolvers/comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}

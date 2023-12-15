import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsResolver } from './resolvers/comments.resolver';
import { Comment } from './entities/comment.entity';
import { CommentCreatedListener } from './listeners/comment-created.listener';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChaptersModule } from '@src/chapters/chapters.module';
import { BooksModule } from '@src/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => ChaptersModule),
    forwardRef(() => BooksModule),
  ],
  providers: [CommentsService, CommentsResolver, CommentCreatedListener],
  exports: [CommentsService],
})
export class CommentsModule {}

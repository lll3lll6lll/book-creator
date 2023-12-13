import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsResolver } from './resolvers/comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@src/comments/entities/comment.entity';
import { ChaptersModule } from '@src/chapters/chapters.module';
import { BooksModule } from '@src/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => ChaptersModule),
    forwardRef(() => BooksModule),
  ],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsService],
})
export class CommentsModule {}

import { forwardRef, Module } from '@nestjs/common';
import { ChaptersService } from './services/chapters.service';
import { ChaptersResolver } from './resolvers/chapters.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { Book } from '@src/books/entities/book.entity';
import { BooksModule } from '@src/books/books.module';
import { CommentsModule } from '@src/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chapter, Book]),
    forwardRef(() => BooksModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [ChaptersService, ChaptersResolver],
  exports: [ChaptersService],
})
export class ChaptersModule {}

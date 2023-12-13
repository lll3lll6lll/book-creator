import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksResolver } from './resolvers/books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { ChaptersModule } from '@src/chapters/chapters.module';
import { CommentsModule } from '@src/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => ChaptersModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
})
export class BooksModule {}

import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksResolver } from './resolvers/books.resolver';

@Module({
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}

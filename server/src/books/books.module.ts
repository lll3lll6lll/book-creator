import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksResolver } from './resolvers/books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService, BooksResolver],
})
export class BooksModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { BookCreate } from '../dto/book.create.dto';
import { BookUpdate } from '../dto/book.update.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createBook(bookCreate: BookCreate): Promise<Book> {
    return await this.bookRepository.save({ ...bookCreate });
  }

  async getOneBook(id: number): Promise<Book> {
    return await this.bookRepository.findOneBy({ id });
  }

  async updateBook(bookUpdate: BookUpdate): Promise<Book> {
    await this.bookRepository.update({ id: bookUpdate.id }, { ...bookUpdate });
    return await this.getOneBook(bookUpdate.id);
  }

  async removeBook(id: number): Promise<number> {
    await this.bookRepository.delete({ id });
    return id;
  }
}

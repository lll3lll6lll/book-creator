import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { ChapterCreate } from '@src/chapters/dto/chapter.create.dto';
import { ChapterUpdate } from '@src/chapters/dto/chapter.update.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  async createChapter(chapterCreate: ChapterCreate): Promise<Chapter> {
    const lastOrder = await this.chapterRepository.maximum('order', {
      book_id: chapterCreate.book_id,
    });
    return await this.chapterRepository.save({
      ...chapterCreate,
      order: (lastOrder || 0) + 1,
    });
  }

  async getOneChapter(id: number): Promise<Chapter> {
    return await this.chapterRepository.findOneBy({ id });
  }

  async removeChapter(id: number): Promise<number> {
    await this.chapterRepository.delete({ id });
    return id;
  }

  async updateChapter(chapterUpdate: ChapterUpdate): Promise<Chapter> {
    await this.chapterRepository.update(
      { id: chapterUpdate.id },
      { ...chapterUpdate },
    );
    return await this.getOneChapter(chapterUpdate.id);
  }

  async getBookChapters(book_id: number): Promise<Chapter[]> {
    return await this.chapterRepository.find({
      where: { book_id },
      order: { order: 'ASC' },
    });
  }
}

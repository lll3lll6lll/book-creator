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
    return await this.chapterRepository.save({ ...chapterCreate });
  }

  async getOneChapter(id: string): Promise<Chapter> {
    return await this.chapterRepository.findOneBy({ id });
  }

  async removeChapter(id: string): Promise<string> {
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
}

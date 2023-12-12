import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ChapterCreate } from '@src/chapters/dto/chapter.create.dto';
import { ChapterUpdate } from '@src/chapters/dto/chapter.update.dto';

export class ChaptersTestFabric {
  private book_id: number;
  private chapters: Chapter[] = [];
  private rep: Repository<Chapter>;
  constructor(client: DataSource | EntityManager) {
    this.rep = client.getRepository(Chapter);
  }

  setDependencies(dep: { book_id: number }) {
    this.book_id = dep.book_id;
  }

  async getOne(): Promise<Chapter> {
    if (!this.book_id) {
      throw Error(
        ' Set dependencies (external key) to create entity of chapter ',
      );
    }

    const obj: ChapterCreate = {
      book_id: this.book_id,
      order: 1,
      title: faker.lorem.sentence(3),
    };
    const chapter = await this.rep.save(obj);
    this.chapters.push(chapter);
    return chapter;
  }

  getUpdates(): Omit<Required<ChapterUpdate>, 'id'> {
    return {
      title: faker.lorem.sentence(3),
      order: 7,
      book_id: this.book_id,
    };
  }

  getCreates(): Required<ChapterCreate> {
    return {
      title: faker.lorem.sentence(3),
      order: 7,
      book_id: this.book_id,
    };
  }

  async clean() {
    await this.rep.delete(this.chapters.map((i) => i.id));
    this.chapters = [];
  }
}

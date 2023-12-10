import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { Chapter } from '@src/chapters/entities/chapter.entity';

export function genFakeChapter(params: Partial<Chapter> = {}): Chapter {
  const chapter = new Chapter();

  chapter.id = +faker.string.numeric(7);
  chapter.book_id = +faker.string.numeric(7);
  chapter.order = +faker.string.numeric(1);
  chapter.title = faker.lorem.sentence(3);

  Object.assign(chapter, params);

  return chapter;
}

export async function saveFakeChapter(
  client: DataSource | EntityManager,
  obj: Partial<Chapter> = {},
): Promise<Chapter> {
  return client.getRepository(Chapter).save(obj);
}

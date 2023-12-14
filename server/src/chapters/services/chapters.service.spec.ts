import { ChaptersService } from './chapters.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { ChaptersModule } from '@src/chapters/chapters.module';
import { DataSource } from 'typeorm';
import { TestEntitiesFabric } from '@test/generators/TestEntitiesFabric';

let nestApp: INestApplication;
let service: ChaptersService;
let client: DataSource;

describe('ChapterService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [ChaptersModule],
    });

    nestApp = app;
    service = module.get<ChaptersService>(ChaptersService);
    client = module.get(DataSource);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Chapters: CRUD', async () => {
    const fabric = new TestEntitiesFabric(client);
    await fabric.createSet();

    const creates = fabric.chapters.getCreates();
    const chapter = await service.createChapter(creates);

    const actual1 = await service.getOneChapter(chapter.id);
    expect(actual1).toEqual(chapter);

    const updates = fabric.chapters.getUpdates();
    Object.assign(chapter, updates);

    await service.updateChapter(chapter);
    const actual2 = await service.getOneChapter(chapter.id);
    expect(actual2).toEqual(chapter);

    await service.removeChapter(chapter.id);
    const actual3 = await service.getOneChapter(chapter.id);
    expect(actual3).toBeNull();

    await fabric.clean();
  });

  it('Chapters: check order', async () => {
    const fabric = new TestEntitiesFabric(client);
    await fabric.createSet();
    const book = await fabric.books.getOne();

    const ch1 = await service.createChapter({
      ...fabric.chapters.getCreates(),
      book_id: book.id,
    });
    expect(ch1.order).toEqual(1);

    const ch2 = await service.createChapter({
      ...fabric.chapters.getCreates(),
      book_id: book.id,
    });
    expect(ch2.order).toEqual(2);

    await fabric.clean();
  });
});

import { ChaptersService } from './chapters.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { ChaptersModule } from '@src/chapters/chapters.module';
import { faker } from '@faker-js/faker';
import { genFakeChapter } from '@test/generators/chapters.fake';

let nestApp: INestApplication;
let service: ChaptersService;
describe('ChapterService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [ChaptersModule],
    });

    nestApp = app;
    service = module.get<ChaptersService>(ChaptersService);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Chapters: CRUD', async () => {
    const fake = genFakeChapter();
    const chapter = await service.createChapter(fake);

    const actual1 = await service.getOneChapter(chapter.id);
    expect(actual1).toEqual(chapter);

    chapter.title = faker.lorem.sentence(3);
    chapter.order = chapter.order++;

    await service.updateChapter(chapter);
    const actual2 = await service.getOneChapter(chapter.id);
    expect(actual2).toEqual(chapter);

    await service.removeChapter(chapter.id);
    const actual3 = await service.getOneChapter(chapter.id);
    expect(actual3).toBeNull();
  });
});

import { CommentsService } from './comments.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { CommentsModule } from '@src/comments/comments.module';
import { faker } from '@faker-js/faker';
import { genFakeComment } from '@test/generators/comment.fake';

let nestApp: INestApplication;
let service: CommentsService;
describe('CommentsService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [CommentsModule],
    });

    nestApp = app;
    service = module.get<CommentsService>(CommentsService);
  });

  afterAll(async () => await nestApp.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Comment: CRUD', async () => {
    const fake = genFakeComment();
    const comment = await service.createComment(fake);

    const actual1 = await service.getOneComment(comment.id);
    expect(actual1).toEqual(comment);

    comment.text = faker.lorem.sentences(7);

    await service.updateComment(comment);
    const actual2 = await service.getOneComment(comment.id);
    expect(actual2).toEqual(comment);

    await service.removeComment(comment.id);
    const actual3 = await service.getOneComment(comment.id);
    expect(actual3).toBeNull();
  });
});

import { CommentsService } from './comments.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { CommentsModule } from '@src/comments/comments.module';
import { faker } from '@faker-js/faker';
import {
  genFakeComment,
  genFakeCommentCreate,
  removeFakeComments,
} from '@test/generators/comment.fake';
import { DataSource } from 'typeorm';

let nestApp: INestApplication;
let service: CommentsService;
let client: DataSource;
describe('CommentsService', () => {
  beforeAll(async () => {
    const { module, app } = await initTestNest({
      imports: [CommentsModule],
    });

    nestApp = app;
    service = module.get<CommentsService>(CommentsService);
    client = module.get(DataSource);
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

  it('Comment: create child comment', async () => {
    const com1 = genFakeCommentCreate({ parent_id: null });
    const c1 = await service.createComment(com1);
    expect(c1.parents).toBeNull();

    const com2 = genFakeCommentCreate({ parent_id: c1.id });
    const c2 = await service.createComment(com2);
    expect(c2.parents).toEqual([c1.id]);

    const com3 = genFakeCommentCreate({ parent_id: c2.id });
    const c3 = await service.createComment(com3);
    expect(c3.parents).toEqual([c1.id, c2.id]);

    await removeFakeComments(client, [c1.id, c2.id, c3.id]);
  });
});

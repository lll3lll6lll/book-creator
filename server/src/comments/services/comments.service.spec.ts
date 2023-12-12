import { CommentsService } from './comments.service';
import { initTestNest } from '@test/utils/test.utils';
import { INestApplication } from '@nestjs/common';
import { CommentsModule } from '@src/comments/comments.module';
import { DataSource } from 'typeorm';
import { TestEntitiesFabric } from '@test/generators/TestEntitiesFabric';

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
    const fabric = new TestEntitiesFabric(client);
    await fabric.createSet();

    const creates = fabric.comments.getCreates();
    const comment = await service.createComment(creates);

    const actual1 = await service.getOneComment(comment.id);
    expect(actual1).toEqual(comment);

    const updates = fabric.comments.getUpdates();
    Object.assign(comment, updates);

    await service.updateComment(comment);
    const actual2 = await service.getOneComment(comment.id);
    expect(actual2).toEqual(comment);

    await service.removeComment(comment.id);
    const actual3 = await service.getOneComment(comment.id);
    expect(actual3).toBeNull();

    await fabric.clean();
  });

  it('Comment: create child comment', async () => {
    const fabric = new TestEntitiesFabric(client);
    await fabric.createSet();

    const creates = fabric.comments.getCreates();
    const c1 = await service.createComment(creates);
    expect(c1.parents).toBeNull();

    const creates2 = fabric.comments.getCreates({ parent_id: c1.id });
    const c2 = await service.createComment(creates2);
    expect(c2.parents).toEqual([c1.id]);

    const creates3 = fabric.comments.getCreates({ parent_id: c2.id });
    const c3 = await service.createComment(creates3);
    expect(c3.parents).toEqual([c1.id, c2.id]);

    await fabric.clean();
  });
});

import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { Comment } from '@src/comments/entities/comment.entity';

export function genFakeComment(params: Partial<Comment> = {}): Comment {
  const comment = new Comment();

  comment.id = +faker.string.numeric(7);
  comment.text = faker.lorem.sentences(4);
  comment.book_id = +faker.string.numeric(7);
  comment.chapter_id = +faker.string.numeric(7);
  comment.parents = null;

  Object.assign(comment, params);

  return comment;
}

export async function saveFakeComment(
  client: DataSource | EntityManager,
  obj: Partial<Comment> = {},
): Promise<Comment> {
  return client.getRepository(Comment).save(obj);
}

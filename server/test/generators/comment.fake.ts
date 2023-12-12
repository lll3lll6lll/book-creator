import { faker } from '@faker-js/faker';
import { DataSource, EntityManager } from 'typeorm';
import { Comment } from '@src/comments/entities/comment.entity';
import { CommentCreate } from '@src/comments/dto/comment.create.dto';
import { Repository } from 'typeorm/repository/Repository';
import { CommentUpdate } from '@src/comments/dto/comment.update.dto';

interface Dependencies {
  book_id: number;
  chapter_id: number;
  parent_id?: number;
}
export class CommentsTestFabric {
  private depends: Dependencies;
  private comments: Comment[] = [];
  private rep: Repository<Comment>;
  constructor(client: DataSource | EntityManager) {
    this.rep = client.getRepository(Comment);
  }

  setDependencies(dep: Dependencies) {
    if (!this.depends) this.depends = dep;
    else Object.assign(this.depends, dep);
    this.depends.parent_id = dep.parent_id || null;
  }

  async getOneWithParent(
    parent_id: number | null = this.depends.parent_id,
  ): Promise<Comment> {
    if (!this.depends.book_id || !this.depends.chapter_id) {
      throw Error(
        ' Set dependencies (external key) to create entity of comment ',
      );
    }

    const obj: CommentCreate = {
      text: faker.lorem.sentence(3),
      book_id: this.depends.book_id,
      chapter_id: this.depends.chapter_id,
      parent_id: parent_id || this.depends.parent_id || null,
    };

    const comment = await this.rep.save(obj);
    this.comments.push(comment);
    return comment;
  }

  async getOne() {
    return this.getOneWithParent();
  }

  getUpdates(): Omit<Required<CommentUpdate>, 'id'> {
    return {
      text: faker.lorem.sentence(3),
    };
  }

  getCreates(params: Partial<CommentCreate> = {}): CommentCreate {
    return {
      text: faker.lorem.sentence(3),
      ...this.depends,
      ...params,
    };
  }

  async clean() {
    await this.rep.delete(this.comments.map((i) => i.id));
    this.comments = [];
  }
}

import { BaseEntity } from '@src/db/base-entity/base.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from '@src/books/entities/book.entity';
import { Chapter } from '@src/chapters/entities/chapter.entity';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'int', array: true })
  parents: number[];

  @Index()
  @Field()
  @Column()
  book_id: number;

  @Index()
  @Field()
  @Column()
  chapter_id: number;

  @Field()
  @Column({ type: 'boolean', default: false })
  deleted: false;

  @Field()
  @ManyToOne(() => Book, (book) => book.comments, { onDelete: 'CASCADE' })
  book: Book;

  @Field()
  @ManyToOne(() => Chapter, (chapter) => chapter.comments, {
    onDelete: 'CASCADE',
  })
  chapter: Book;
}

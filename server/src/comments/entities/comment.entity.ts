import { BaseEntity } from '@src/db/base-entity/base.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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

  @Field(() => [Int], { nullable: true })
  @Column({ nullable: true, type: 'int', array: true })
  parents: number[];

  @Index()
  @Field()
  @Column()
  book_id: number;

  @Index()
  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  chapter_id: number;

  @Field()
  @Column({ type: 'boolean', default: false })
  deleted: false;

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.comments, { onDelete: 'CASCADE' })
  book: Book;

  @Field(() => Chapter)
  @ManyToOne(() => Chapter, (chapter) => chapter.comments, {
    onDelete: 'CASCADE',
  })
  chapter: Chapter;
}

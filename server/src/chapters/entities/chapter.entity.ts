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

@Entity()
@ObjectType()
export class Chapter extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  order: number;

  @Index()
  @Field()
  @Column()
  book_id: number;

  @ManyToOne(() => Book, (book) => book.chapters, { onDelete: 'CASCADE' })
  book: Book;
}

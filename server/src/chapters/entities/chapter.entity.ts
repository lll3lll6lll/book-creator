import { BaseEntity } from '@src/db/base-entity/base.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from '@src/books/entities/book.entity';
import { Comment } from '@src/comments/entities/comment.entity';

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

  @Field(() => Book)
  @ManyToOne(() => Book, (book) => book.chapters, { onDelete: 'CASCADE' })
  book: Book;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.chapter)
  comments: Comment[];
}

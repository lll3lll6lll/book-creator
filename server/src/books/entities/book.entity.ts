import { BaseEntity } from '@src/db/base-entity/base.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Chapter } from '@src/chapters/entities/chapter.entity';
import { Comment } from '@src/comments/entities/comment.entity';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Index()
  @Field()
  @Column()
  owner_id: number;

  @Field(() => [Chapter], { nullable: true })
  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[];
}

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
  @Field({ nullable: true })
  @Column({ nullable: true })
  owner_id: number;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];
}

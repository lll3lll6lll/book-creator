import { BaseEntity } from '@src/db/base-entity/base.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}

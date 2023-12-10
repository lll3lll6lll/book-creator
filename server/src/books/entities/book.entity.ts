import { BaseEntity } from '@src/db/base-entity/base.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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
  ownerId: number;
}

import { BaseEntity } from '@src/db/base-entity/base.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

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
  @Column({ nullable: true })
  parents?: number[];

  @Index()
  @Field()
  @Column()
  entity_id: number;
}

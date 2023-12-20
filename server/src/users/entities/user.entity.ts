import { BaseEntity } from '@src/db/base-entity/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  @Column({ select: false })
  password: string;

  @Field()
  @Column({ default: false })
  is_activated?: boolean;

  @Column({ nullable: true, select: false })
  activation_link?: string;
}

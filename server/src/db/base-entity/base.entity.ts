import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field()
  @Type(() => Date)
  @CreateDateColumn({ type: 'timestamptz', update: false })
  created_at: Date;

  @Field()
  @Type(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

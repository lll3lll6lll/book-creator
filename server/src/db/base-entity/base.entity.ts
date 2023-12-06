import {
    Column, CreateDateColumn, DeleteDateColumn,
    Index, UpdateDateColumn
} from 'typeorm';
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

    @Field(() => Date, { nullable: true })
    @Type(() => Date)
    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date | null;

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true, update: false })
    created_by?: string | null;

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    @Index({ unique: false })
    updated_by?: string | null;
}

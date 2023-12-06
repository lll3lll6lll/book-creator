import { BaseEntity } from '@src/db/base-entity/base.entity';
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field} from "@nestjs/graphql";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    email: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    name: string
}

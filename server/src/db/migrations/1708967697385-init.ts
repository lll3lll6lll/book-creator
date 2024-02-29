import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1708967697385 implements MigrationInterface {
    name = 'Init1708967697385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boo_creator"."user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "password" character varying NOT NULL, "is_activated" boolean NOT NULL DEFAULT false, "activation_link" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boo_creator"."chapter" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "book_id" integer NOT NULL, "bookId" integer, CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5764293646b6746cc5c5ff9173" ON "boo_creator"."chapter" ("book_id") `);
        await queryRunner.query(`CREATE TABLE "boo_creator"."book" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, "owner_id" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea605a3dca0946bd2aa532c5d7" ON "boo_creator"."book" ("owner_id") `);
        await queryRunner.query(`CREATE TABLE "boo_creator"."comment" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "text" character varying NOT NULL, "parents" integer array, "book_id" integer NOT NULL, "chapter_id" integer, "deleted" boolean NOT NULL DEFAULT false, "bookId" integer, "chapterId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b6490a2fe4fbdd12934b90ed6" ON "boo_creator"."comment" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_198048fc909b718e6bd8c38b7b" ON "boo_creator"."comment" ("chapter_id") `);
        await queryRunner.query(`CREATE TABLE "boo_creator"."auth_token" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "refresh" character varying NOT NULL, CONSTRAINT "UQ_26b580c89e141c75426f44317bc" UNIQUE ("user_id"), CONSTRAINT "PK_4572ff5d1264c4a523f01aa86a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boo_creator"."chapter" ADD CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0" FOREIGN KEY ("bookId") REFERENCES "boo_creator"."book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boo_creator"."comment" ADD CONSTRAINT "FK_9eb8ce066f46b656be75d847150" FOREIGN KEY ("bookId") REFERENCES "boo_creator"."book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boo_creator"."comment" ADD CONSTRAINT "FK_ded13a43b98c25920cbfb665e5e" FOREIGN KEY ("chapterId") REFERENCES "boo_creator"."chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boo_creator"."comment" DROP CONSTRAINT "FK_ded13a43b98c25920cbfb665e5e"`);
        await queryRunner.query(`ALTER TABLE "boo_creator"."comment" DROP CONSTRAINT "FK_9eb8ce066f46b656be75d847150"`);
        await queryRunner.query(`ALTER TABLE "boo_creator"."chapter" DROP CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0"`);
        await queryRunner.query(`DROP TABLE "boo_creator"."auth_token"`);
        await queryRunner.query(`DROP INDEX "boo_creator"."IDX_198048fc909b718e6bd8c38b7b"`);
        await queryRunner.query(`DROP INDEX "boo_creator"."IDX_9b6490a2fe4fbdd12934b90ed6"`);
        await queryRunner.query(`DROP TABLE "boo_creator"."comment"`);
        await queryRunner.query(`DROP INDEX "boo_creator"."IDX_ea605a3dca0946bd2aa532c5d7"`);
        await queryRunner.query(`DROP TABLE "boo_creator"."book"`);
        await queryRunner.query(`DROP INDEX "boo_creator"."IDX_5764293646b6746cc5c5ff9173"`);
        await queryRunner.query(`DROP TABLE "boo_creator"."chapter"`);
        await queryRunner.query(`DROP TABLE "boo_creator"."user"`);
    }

}

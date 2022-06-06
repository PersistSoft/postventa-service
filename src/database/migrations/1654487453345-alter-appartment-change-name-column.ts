import {MigrationInterface, QueryRunner} from "typeorm";

export class alterAppartmentChangeNameColumn1654487453345 implements MigrationInterface {
    name = 'alterAppartmentChangeNameColumn1654487453345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" RENAME COLUMN "constructionName" TO "construction_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" RENAME COLUMN "construction_name" TO "constructionName"`);
    }

}

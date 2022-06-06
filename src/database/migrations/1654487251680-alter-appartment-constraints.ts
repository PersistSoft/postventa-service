import {MigrationInterface, QueryRunner} from "typeorm";

export class alterAppartmentConstraints1654487251680 implements MigrationInterface {
    name = 'alterAppartmentConstraints1654487251680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "appartments" ADD "constructionName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appartments" ALTER COLUMN "sales_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appartments" ALTER COLUMN "definitive_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" ALTER COLUMN "definitive_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appartments" ALTER COLUMN "sales_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appartments" DROP COLUMN "constructionName"`);
        await queryRunner.query(`ALTER TABLE "appartments" ADD "code" character varying(280) NOT NULL`);
    }

}

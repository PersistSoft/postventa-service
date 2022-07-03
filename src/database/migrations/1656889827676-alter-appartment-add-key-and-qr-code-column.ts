import {MigrationInterface, QueryRunner} from "typeorm";

export class alterAppartmentAddKeyAndQrCodeColumn1656889827676 implements MigrationInterface {
    name = 'alterAppartmentAddKeyAndQrCodeColumn1656889827676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" ADD "key" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" DROP COLUMN "key"`);
    }

}

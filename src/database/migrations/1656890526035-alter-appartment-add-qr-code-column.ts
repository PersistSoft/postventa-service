import {MigrationInterface, QueryRunner} from "typeorm";

export class alterAppartmentAddQrCodeColumn1656890526035 implements MigrationInterface {
    name = 'alterAppartmentAddQrCodeColumn1656890526035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" ADD "qr_code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appartments" DROP COLUMN "qr_code"`);
    }

}

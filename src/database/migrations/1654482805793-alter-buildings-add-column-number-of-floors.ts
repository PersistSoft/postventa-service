import {MigrationInterface, QueryRunner} from "typeorm";

export class alterBuildingsAddColumnNumberOfFloors1654482805793 implements MigrationInterface {
    name = 'alterBuildingsAddColumnNumberOfFloors1654482805793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buildings" ADD "number_of_floors" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buildings" DROP COLUMN "number_of_floors"`);
    }

}

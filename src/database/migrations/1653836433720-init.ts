import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1653836433720 implements MigrationInterface {
  name = 'init1653836433720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appartment_type" ("id" SERIAL NOT NULL, "code" character varying(5) NOT NULL, "name" character varying(50) NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b90b3390fd7b655bedf932a2022" UNIQUE ("code"), CONSTRAINT "PK_e84bc42456e92825cc7df98ee49" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL DEFAULT 'active', "address" character varying(150) NOT NULL DEFAULT 'active', "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "buildings" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL DEFAULT 'active', "number_of_appartments" integer NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "project_id" integer, CONSTRAINT "PK_bc65c1acce268c383e41a69003a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "parkings" ("id" SERIAL NOT NULL, "code" character varying(5) NOT NULL, "name" character varying(50) NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_32873a8759cffdc11e299cd858a" UNIQUE ("code"), CONSTRAINT "PK_ff5851f221bd241a0e959403f9b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "unit_storage" ("id" SERIAL NOT NULL, "code" character varying(5) NOT NULL, "name" character varying(50) NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_90967802c79359ff8fdbac361ce" UNIQUE ("code"), CONSTRAINT "PK_6bb275425e0db39d5d1f30fe2cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "appartments" ("id" SERIAL NOT NULL, "code" character varying(280) NOT NULL, "sales_name" character varying NOT NULL, "definitive_name" character varying NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "building_id" integer, "parking_id" integer, "unit_storage_id" integer, "appartment_type_id" integer, CONSTRAINT "PK_84234070b393af8c9b1756cd7a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "first_name" character varying(60) NOT NULL, "last_name" character varying(60) NOT NULL, "email" character varying(50) NOT NULL, "phone" character varying(10) NOT NULL, "dialCode" character varying(3) NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mimeType" character varying(20) NOT NULL, "byte" bytea, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status_warranty_types" ("id" SERIAL NOT NULL, "code" character varying(5) NOT NULL, "name" character varying(50) NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_01058fc5f0bcf37ffd03f4d2446" UNIQUE ("code"), CONSTRAINT "PK_9868c4844b8da80d8ce0f0ea28d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "types" ("id" SERIAL NOT NULL, "code" character varying(5) NOT NULL, "name" character varying(50) NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_0888743b52d75e0435c1da667d0" UNIQUE ("code"), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warranty_history" ("id" SERIAL NOT NULL, "oldStatus" character varying NOT NULL, "newStatus" character varying NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_74431ef4a2889760a5b58fc80bf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warranty_status" ("id" SERIAL NOT NULL, "code" character varying(5) NOT NULL, "name" character varying(50) NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_c72c53fc672042afe4e92d6bf44" UNIQUE ("code"), CONSTRAINT "PK_f815d8b29b20d42e5385110e233" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warranties" ("id" SERIAL NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "client_id" integer, "file_id" integer, "appartment_id" integer, "warranty_status_id" integer, CONSTRAINT "PK_62c441630f8a6ddcc4bc1ab1bc5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warranty_type" ("id" SERIAL NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "warranty_id" integer, "type_id" integer, "status_warranty_type_id" integer, CONSTRAINT "PK_be64d542a745412ee052df81e5c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warranty_type_file" ("id" SERIAL NOT NULL, "warranty_type_id" integer, "file_id" integer, CONSTRAINT "PK_aa0e09745ab15c0374146c3a6a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warranty_type_history" ("id" SERIAL NOT NULL, "oldStatus" character varying NOT NULL, "newStatus" character varying NOT NULL, "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bcbde766115192348201166a6b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(100) NOT NULL, "status" character varying(10) NOT NULL DEFAULT 'active', "creation_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "code" character varying(20) NOT NULL, "description" character varying(100) NOT NULL, CONSTRAINT "UQ_ee999bb389d7ac0fd967172c41f" UNIQUE ("code"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "code" character varying(20) NOT NULL, "description" character varying(100) NOT NULL, CONSTRAINT "UQ_8dad765629e83229da6feda1c1d" UNIQUE ("code"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("role_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("role_id", "user_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permission" ("permission_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_19a94c31d4960ded0dcd0397759" PRIMARY KEY ("permission_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "buildings" ADD CONSTRAINT "FK_e87e8485765ac8de058a0dda3f1" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" ADD CONSTRAINT "FK_6a6ccf876d4daa25823e8dd9d7c" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" ADD CONSTRAINT "FK_876f2dabb279451e824b62f6bde" FOREIGN KEY ("parking_id") REFERENCES "parkings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" ADD CONSTRAINT "FK_cf4c556c23707a80616b34a7d2b" FOREIGN KEY ("unit_storage_id") REFERENCES "unit_storage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" ADD CONSTRAINT "FK_0f14fce55aeaa6a41958c2ad9a2" FOREIGN KEY ("appartment_type_id") REFERENCES "appartment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" ADD CONSTRAINT "FK_472f65abaabd69bf7c8e82f8e52" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" ADD CONSTRAINT "FK_64c2a4cf76a1a30380baa2f5885" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" ADD CONSTRAINT "FK_0b605dfe7e6793998d50584dc86" FOREIGN KEY ("appartment_id") REFERENCES "appartments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" ADD CONSTRAINT "FK_db31a659c444073e03913a03fa2" FOREIGN KEY ("warranty_status_id") REFERENCES "warranty_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type" ADD CONSTRAINT "FK_f667cc89f24ed5407d8ad9063a7" FOREIGN KEY ("warranty_id") REFERENCES "warranties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type" ADD CONSTRAINT "FK_c1efaeab1d59ad8fcac8f86398a" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type" ADD CONSTRAINT "FK_4a84319f1269acf0eb2d04f9b80" FOREIGN KEY ("status_warranty_type_id") REFERENCES "status_warranty_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type_file" ADD CONSTRAINT "FK_d564151223f196d08edc6dacc33" FOREIGN KEY ("warranty_type_id") REFERENCES "warranty_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type_file" ADD CONSTRAINT "FK_3dcf49c09a3258c606770993029" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type_file" DROP CONSTRAINT "FK_3dcf49c09a3258c606770993029"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type_file" DROP CONSTRAINT "FK_d564151223f196d08edc6dacc33"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type" DROP CONSTRAINT "FK_4a84319f1269acf0eb2d04f9b80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type" DROP CONSTRAINT "FK_c1efaeab1d59ad8fcac8f86398a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranty_type" DROP CONSTRAINT "FK_f667cc89f24ed5407d8ad9063a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" DROP CONSTRAINT "FK_db31a659c444073e03913a03fa2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" DROP CONSTRAINT "FK_0b605dfe7e6793998d50584dc86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" DROP CONSTRAINT "FK_64c2a4cf76a1a30380baa2f5885"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warranties" DROP CONSTRAINT "FK_472f65abaabd69bf7c8e82f8e52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" DROP CONSTRAINT "FK_0f14fce55aeaa6a41958c2ad9a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" DROP CONSTRAINT "FK_cf4c556c23707a80616b34a7d2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" DROP CONSTRAINT "FK_876f2dabb279451e824b62f6bde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appartments" DROP CONSTRAINT "FK_6a6ccf876d4daa25823e8dd9d7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "buildings" DROP CONSTRAINT "FK_e87e8485765ac8de058a0dda3f1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d0a7155eafd75ddba5a701336"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e3a3ba47b7ca00fd23be4ebd6c"`,
    );
    await queryRunner.query(`DROP TABLE "role_permission"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d0e5815877f7395a198a4cb0a4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32a6fc2fcb019d8e3a8ace0f55"`,
    );
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "warranty_type_history"`);
    await queryRunner.query(`DROP TABLE "warranty_type_file"`);
    await queryRunner.query(`DROP TABLE "warranty_type"`);
    await queryRunner.query(`DROP TABLE "warranties"`);
    await queryRunner.query(`DROP TABLE "warranty_status"`);
    await queryRunner.query(`DROP TABLE "warranty_history"`);
    await queryRunner.query(`DROP TABLE "types"`);
    await queryRunner.query(`DROP TABLE "status_warranty_types"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "appartments"`);
    await queryRunner.query(`DROP TABLE "unit_storage"`);
    await queryRunner.query(`DROP TABLE "parkings"`);
    await queryRunner.query(`DROP TABLE "buildings"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "appartment_type"`);
  }
}

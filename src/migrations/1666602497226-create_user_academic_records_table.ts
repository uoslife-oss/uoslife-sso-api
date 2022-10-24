import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserAcademicRecordsTable1666602497226
  implements MigrationInterface
{
  name = 'createUserAcademicRecordsTable1666602497226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_academic_records" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "student_number" character varying NOT NULL,
                "major" character varying NOT NULL,
                "major_code" character varying NOT NULL,
                "department" character varying NOT NULL,
                "department_code" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "PK_ca3aec2d7f90c1c29e12a774d0c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_academic_records"
            ADD CONSTRAINT "FK_cfb9c7a23b15752f412a6618207" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_academic_records" DROP CONSTRAINT "FK_cfb9c7a23b15752f412a6618207"
        `);
    await queryRunner.query(`
            DROP TABLE "user_academic_records"
        `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeStudentNumberUnique1666614283100
  implements MigrationInterface
{
  name = 'makeStudentNumberUnique1666614283100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_academic_records"
            ADD CONSTRAINT "UQ_e41e8d5d89b2968703c15cc826a" UNIQUE ("student_number")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_academic_records" DROP CONSTRAINT "UQ_e41e8d5d89b2968703c15cc826a"
        `);
  }
}

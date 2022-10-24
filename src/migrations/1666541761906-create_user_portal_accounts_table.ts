import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserPortalAccountsTable1666541761906
  implements MigrationInterface
{
  name = 'createUserPortalAccountsTable1666541761906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_portal_accounts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "last_used_at" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "PK_85a895612ed77ce6104ec3f05b2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_portal_accounts"
            ADD CONSTRAINT "FK_770e6b19628443576ddbe3f8f92" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_portal_accounts" DROP CONSTRAINT "FK_770e6b19628443576ddbe3f8f92"
        `);
    await queryRunner.query(`
            DROP TABLE "user_portal_accounts"
        `);
  }
}

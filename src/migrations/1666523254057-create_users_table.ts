import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1666523254057 implements MigrationInterface {
  name = 'createUsersTable1666523254057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_verifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying,
                "type" character varying NOT NULL DEFAULT 'email',
                "state" character varying NOT NULL DEFAULT 'pending',
                "verified_at" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "PK_3269a92433d028916ab342b94fb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "name" character varying NOT NULL,
                "nickname" character varying,
                "phone_number" character varying NOT NULL,
                "profile_image" character varying,
                "state" character varying NOT NULL DEFAULT 'unverified',
                "type" character varying NOT NULL DEFAULT 'normal',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"),
                CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_verifications"
            ADD CONSTRAINT "FK_2c6a037273f1cb3e6fdd832db24" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_verifications" DROP CONSTRAINT "FK_2c6a037273f1cb3e6fdd832db24"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "user_verifications"
        `);
  }
}

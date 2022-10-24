import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';
import { UserAcademicRecordEntity } from '@infrastructure/user/entities/user-academic-record.entity';
import { UserPortalAccountEntity } from '@infrastructure/user/entities/user-portal-account.entity';
import { UserVerificationEntity } from '@infrastructure/user/entities/user-verification.entity';
import { UserEntity } from '@infrastructure/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserPortalAccountEntity,
      UserVerificationEntity,
      UserAcademicRecordEntity,
    ]),
  ],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class DatabaseUserModule {}

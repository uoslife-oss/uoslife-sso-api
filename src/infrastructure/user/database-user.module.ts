import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';
import { UserVerificationEntity } from '@infrastructure/user/user-verification.entity';
import { UserEntity } from '@infrastructure/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserVerificationEntity])],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class DatabaseUserModule {}

import { Module } from '@nestjs/common';

import { UserCoreService } from '@application/user/user-core/user-core.service';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';

@Module({
  imports: [DatabaseUserModule],
  providers: [
    UserCoreService,
    {
      provide: 'UserRepository',
      useExisting: DatabaseUserRepository,
    },
  ],
  exports: [UserCoreService],
})
export class UserCoreModule {}

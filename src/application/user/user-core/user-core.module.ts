import { Module } from '@nestjs/common';

import { UserCoreService } from '@application/user/user-core/user-core.service';
import { ScrapModule } from '@infrastructure/scrap/scrap.module';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';

@Module({
  imports: [DatabaseUserModule, ScrapModule],
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

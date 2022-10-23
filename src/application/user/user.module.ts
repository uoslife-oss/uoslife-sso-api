import { Module } from '@nestjs/common';

import { UserService } from '@application/user/user.service';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';

@Module({
  imports: [DatabaseUserModule],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useExisting: DatabaseUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

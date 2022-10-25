import { Module } from '@nestjs/common';

import { UserDeviceService } from '@application/user/user-device/user-device.service';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';

@Module({
  imports: [DatabaseUserModule],
  providers: [
    { provide: 'UserRepository', useExisting: DatabaseUserRepository },
    UserDeviceService,
  ],
  exports: [UserDeviceService],
})
export class UserDeviceModule {}

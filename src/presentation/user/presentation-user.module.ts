import { Module } from '@nestjs/common';

import { UserModule } from '@application/user/user.module';
import { UserDeviceController } from '@presentation/user/controllers/user-device.controller';
import { UserVerificationController } from '@presentation/user/controllers/user-verification.controller';
import { UserController } from '@presentation/user/controllers/user.controller';

@Module({
  imports: [UserModule],
  controllers: [
    UserController,
    UserVerificationController,
    UserDeviceController,
  ],
})
export class PresentationUserModule {}

import { Module } from '@nestjs/common';

import { UserCoreModule } from '@application/user/user-core/user-core.module';
import { UserDeviceModule } from '@application/user/user-device/user-device.module';
import { UserVerificationModule } from '@application/user/user-verification/user-verification.module';

@Module({
  imports: [UserCoreModule, UserVerificationModule, UserDeviceModule],
  exports: [UserCoreModule, UserVerificationModule, UserDeviceModule],
})
export class UserModule {}

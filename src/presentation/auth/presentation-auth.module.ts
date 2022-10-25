import { Module } from '@nestjs/common';

import { AuthModule } from '@application/auth/auth.module';
import { AccountAuthController } from '@presentation/auth/controllers/account-auth.controller';
import { DeviceAuthController } from '@presentation/auth/controllers/device-auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AccountAuthController, DeviceAuthController],
})
export class PresentationAuthModule {}

import { Module } from '@nestjs/common';

import { UserCoreModule } from '@application/user/user-core/user-core.module';
import { UserVerificationModule } from '@application/user/user-verification/user-verification.module';
import { UserVerificationController } from '@presentation/user/user-verification.controller';
import { UserController } from '@presentation/user/user.controller';

@Module({
  imports: [UserCoreModule, UserVerificationModule],
  controllers: [UserController, UserVerificationController],
})
export class PresentationUserModule {}

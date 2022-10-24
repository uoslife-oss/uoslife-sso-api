import { Module } from '@nestjs/common';

import { UserCoreModule } from '@application/user/user-core/user-core.module';

@Module({
  imports: [UserCoreModule],
})
export class UserModule {}

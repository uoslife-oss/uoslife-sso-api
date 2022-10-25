import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@application/auth/authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  exports: [AuthenticationModule],
})
export class AuthModule {}

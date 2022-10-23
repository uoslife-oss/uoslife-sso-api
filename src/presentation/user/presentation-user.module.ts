import { Module } from '@nestjs/common';

import { UserModule } from '@application/user/user.module';
import { UserController } from '@presentation/user/user.controller';

@Module({
  imports: [UserModule],
  controllers: [UserController],
})
export class PresentationUserModule {}

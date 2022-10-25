import { Module } from '@nestjs/common';

import { PresentationAuthModule } from '@presentation/auth/presentation-auth.module';
import { PresentationUserModule } from '@presentation/user/presentation-user.module';

@Module({
  imports: [PresentationUserModule, PresentationAuthModule],
})
export class PresentationModule {}

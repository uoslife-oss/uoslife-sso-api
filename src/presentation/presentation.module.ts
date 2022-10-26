import { Module } from '@nestjs/common';

import { AdminModule } from '@presentation/admin/admin.module';
import { PresentationAuthModule } from '@presentation/auth/presentation-auth.module';
import { PresentationUserModule } from '@presentation/user/presentation-user.module';

@Module({
  imports: [PresentationUserModule, PresentationAuthModule, AdminModule],
})
export class PresentationModule {}

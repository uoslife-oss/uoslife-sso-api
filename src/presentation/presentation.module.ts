import { Module } from '@nestjs/common';

import { PresentationUserModule } from '@presentation/user/presentation-user.module';

@Module({
  imports: [PresentationUserModule],
})
export class PresentationModule {}

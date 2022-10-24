import { Module } from '@nestjs/common';

import { ScrapWiseModule } from '@infrastructure/scrap/wise/scrap-wise.module';

@Module({
  imports: [ScrapWiseModule],
})
export class ScrapModule {}

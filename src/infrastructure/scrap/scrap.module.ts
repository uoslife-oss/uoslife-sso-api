import { Module } from '@nestjs/common';

import { ScrapUoslifeModule } from '@infrastructure/scrap/uoslife/scrap-uoslife.module';
import { ScrapWiseModule } from '@infrastructure/scrap/wise/scrap-wise.module';

@Module({
  imports: [ScrapWiseModule, ScrapUoslifeModule],
  exports: [ScrapWiseModule, ScrapUoslifeModule],
})
export class ScrapModule {}

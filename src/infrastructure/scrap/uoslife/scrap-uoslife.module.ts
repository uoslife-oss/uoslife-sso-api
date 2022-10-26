import { Module } from '@nestjs/common';

import { OldAccountScrapper } from '@infrastructure/scrap/uoslife/old-account.scrapper';

@Module({
  providers: [OldAccountScrapper],
  exports: [OldAccountScrapper],
})
export class ScrapUoslifeModule {}

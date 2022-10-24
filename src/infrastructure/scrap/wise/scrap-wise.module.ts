import { Module } from '@nestjs/common';

import { PortalAccountScrapper } from '@infrastructure/scrap/wise/portal-account.scrapper';

@Module({
  imports: [],
  providers: [PortalAccountScrapper],
  exports: [PortalAccountScrapper],
})
export class ScrapWiseModule {}

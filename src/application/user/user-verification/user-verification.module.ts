import { Module } from '@nestjs/common';

import { DocumentUserVerificationService } from '@application/user/user-verification/document-user-verification.service';
import { EmailUserVerificationService } from '@application/user/user-verification/email-user-verification.service';
import { PortalUserVerificationService } from '@application/user/user-verification/portal-user-verification.service';
import { EmailModule } from '@infrastructure/notification/email/email.module';
import { ScrapWiseModule } from '@infrastructure/scrap/wise/scrap-wise.module';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';

@Module({
  imports: [DatabaseUserModule, EmailModule, ScrapWiseModule],
  providers: [
    {
      provide: 'EmailVerificationService',
      useClass: EmailUserVerificationService,
    },
    {
      provide: 'PortalVerificationService',
      useClass: PortalUserVerificationService,
    },
    {
      provide: 'DocumentVerificationService',
      useClass: DocumentUserVerificationService,
    },
    {
      provide: 'UserRepository',
      useExisting: DatabaseUserRepository,
    },
  ],
  exports: [
    'EmailVerificationService',
    'PortalVerificationService',
    'DocumentVerificationService',
  ],
})
export class UserVerificationModule {}

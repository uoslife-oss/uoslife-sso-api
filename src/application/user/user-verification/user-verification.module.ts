import { Module } from '@nestjs/common';

import { UserRegisterListener } from '@application/user/user-verification/listeners/user-register.listener';
import { DocumentUserVerificationService } from '@application/user/user-verification/services/document-user-verification.service';
import { EmailUserVerificationService } from '@application/user/user-verification/services/email-user-verification.service';
import { PortalUserVerificationService } from '@application/user/user-verification/services/portal-user-verification.service';
import { EmailModule } from '@infrastructure/notification/email/email.module';
import { ScrapWiseModule } from '@infrastructure/scrap/wise/scrap-wise.module';
import { DatabaseUserModule } from '@infrastructure/user/database-user.module';
import { DatabaseUserRepository } from '@infrastructure/user/database-user.repository';

@Module({
  imports: [DatabaseUserModule, EmailModule, ScrapWiseModule],
  providers: [
    UserRegisterListener,
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

import { Injectable } from '@nestjs/common';

import {
  VerificationCallback,
  VerificationRequestCommand,
} from '@application/user/user-verification/user-verification.command';
import { UserVerificationService } from '@application/user/user-verification/user-verification.service';
import { EmailService } from '@infrastructure/notification/email/email.service';
import { EmailUserVerificationRequest } from '@presentation/user/dtos/user-verification.request';

@Injectable()
export class EmailUserVerificationService implements UserVerificationService {
  constructor(private readonly emailService: EmailService) {}

  async request(
    userId: string,
    data: EmailUserVerificationRequest,
  ): Promise<string> {
    return '';
  }

  async process(verificationId: string): Promise<void> {
    return undefined;
  }

  async callback(data: VerificationCallback): Promise<void> {
    return undefined;
  }

  async finish(verificationId: string): Promise<boolean> {
    return undefined;
  }
}

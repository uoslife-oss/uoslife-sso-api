import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generate } from 'randomstring';

import { UserVerificationService } from '@application/user/user-verification/services/user-verification.service';
import { VerificationCallback } from '@application/user/user-verification/user-verification.command';
import {
  UserRepository,
  UserVerification,
  VerificationState,
  VerificationType,
} from '@domain/user';
import { EmailService } from '@infrastructure/notification/email/email.service';

@Injectable()
export class EmailUserVerificationService implements UserVerificationService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async request(userId: string): Promise<string> {
    const user = await this.userRepository.getUserById(userId);

    return this.userRepository.createVerification(
      user,
      new UserVerification({
        state: VerificationState.PENDING,
        type: VerificationType.EMAIL,
        code: generate({ length: 6, charset: 'alphanumeric' }),
      }),
    );
  }

  async process(verificationId: string): Promise<void> {
    const user = await this.userRepository.getUserByVerificationId(
      verificationId,
    );
    const verification = user.getVerification(verificationId);

    const serviceUrl = this.configService.get<string>('SERVICE_URL');

    await this.emailService.sendTemplateEmail(
      {
        to: user.email,
        subject: '시대생 인증 메일입니다.',
      },
      'register',
      { verificationURL: `${serviceUrl}/verify/${verification.code}` },
    );
  }

  async callback(data: VerificationCallback): Promise<void> {
    return undefined;
  }

  async finish(verificationId: string): Promise<boolean> {
    return undefined;
  }
}

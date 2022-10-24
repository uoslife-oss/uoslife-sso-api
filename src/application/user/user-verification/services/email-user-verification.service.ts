import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { differenceInDays } from 'date-fns';
import { generate } from 'randomstring';

import { UserVerificationService } from '@application/user/user-verification/services/user-verification.service';
import { VerificationCallback } from '@application/user/user-verification/user-verification.command';
import {
  UserRepository,
  UserState,
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
    const verification = user.getVerificationById(verificationId);

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

  async callback(data: VerificationCallback): Promise<string> {
    const user = await this.userRepository.getUserByVerificationCode(data.code);
    const verification = user.getVerificationByCode(data.code);

    if (
      !verification ||
      differenceInDays(verification.createdAt, new Date()) > 1
    ) {
      throw new NotFoundException('VERIFICATION_NOT_FOUND');
    }

    return verification.id;
  }

  async finish(verificationId: string): Promise<boolean> {
    const user = await this.userRepository.getUserByVerificationId(
      verificationId,
    );
    const verification = user.getVerificationById(verificationId);

    if (user.state !== UserState.UNVERIFIED) {
      throw new BadRequestException('USER_ALREADY_VERIFIED');
    }

    user.state = UserState.NEWBIE;
    verification.state = VerificationState.VERIFIED;
    verification.verifiedAt = new Date();

    await Promise.all([
      this.userRepository.updateProfile(user),
      this.userRepository.updateVerification(user, verification),
    ]);

    return true;
  }
}

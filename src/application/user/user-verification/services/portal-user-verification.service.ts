import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { UserVerificationService } from '@application/user/user-verification/services/user-verification.service';
import {
  RequestWithPortalCommand,
  VerificationRequestCommand,
} from '@application/user/user-verification/user-verification.command';
import {
  UserRepository,
  UserState,
  UserVerification,
  VerificationState,
  VerificationType,
} from '@domain/user';
import { UserPortalAccount } from '@domain/user/user-portal-account';
import { PortalAccountScrapper } from '@infrastructure/scrap/wise/portal-account.scrapper';
import { BadPortalCredentialsError } from '@infrastructure/scrap/wise/scrap-wise.errors';

@Injectable()
export class PortalUserVerificationService implements UserVerificationService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly portalAccountScrapper: PortalAccountScrapper,
  ) {}

  async request(
    userId: string,
    data: VerificationRequestCommand,
  ): Promise<string> {
    const user = await this.userRepository.getUserById(userId);
    const profile = data as RequestWithPortalCommand;

    const [verificationId] = await Promise.all([
      this.userRepository.createVerification(
        user,
        new UserVerification({
          type: VerificationType.PORTAL,
          state: VerificationState.PENDING,
        }),
      ),
      this.userRepository.createPortalAccount(
        user,
        new UserPortalAccount({
          username: profile.portalUsername,
          password: profile.portalPassword,
        }),
      ),
    ]);

    return verificationId;
  }

  async process(verificationId: string): Promise<void> {
    const user = await this.userRepository.getUserByVerificationId(
      verificationId,
    );
    const portalAccount = user.portalAccounts.shift();

    try {
      const record = await this.portalAccountScrapper.scrap({
        username: portalAccount.username,
        password: portalAccount.password,
      });
      await this.userRepository.upsertAcademicRecord(user, record);
    } catch (error) {
      if (error instanceof BadPortalCredentialsError) {
        await this.userRepository.deletePortalAccount(user, portalAccount);
        throw new BadRequestException('BAD_PORTAL_CREDENTIALS');
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async finish(verificationId: string): Promise<boolean> {
    const user = await this.userRepository.getUserByVerificationId(
      verificationId,
    );

    const verification = user.getVerificationById(verificationId);

    if (user.academicRecords.length === 0) {
      throw new BadRequestException('ACADEMIC_STATUS_NOT_FOUND');
    }

    user.state = UserState.VERIFIED;
    verification.state = VerificationState.VERIFIED;
    verification.verifiedAt = new Date();

    await Promise.all([
      this.userRepository.updateProfile(user),
      this.userRepository.updateVerification(user, verification),
    ]);

    return true;
  }
}

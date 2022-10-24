import { UserVerificationService } from '@application/user/user-verification/services/user-verification.service';
import { VerificationRequestCommand } from '@application/user/user-verification/user-verification.command';

export class DocumentUserVerificationService
  implements UserVerificationService
{
  finish(verificationId: string): boolean | Promise<boolean> {
    return undefined;
  }

  request(
    userId: string,
    data: VerificationRequestCommand,
  ): string | Promise<string> {
    return undefined;
  }
}

import { VerificationRequestCommand } from '@application/user/user-verification/user-verification.command';
import { UserVerificationService } from '@application/user/user-verification/user-verification.service';

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

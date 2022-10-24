import {
  VerificationCallback,
  VerificationRequestCommand,
} from '@application/user/user-verification/user-verification.command';

export interface UserVerificationService {
  request(
    userId: string,
    data?: VerificationRequestCommand,
  ): string | Promise<string>;
  process?(verificationId: string): void | Promise<void>;
  callback?(data: VerificationCallback): string | Promise<string>;
  finish(verificationId: string): boolean | Promise<boolean>;
}

export enum VerificationType {
  EMAIL = 'email',
  PORTAL = 'portal',
  DOCUMENT = 'document',
}

export enum VerificationState {
  PENDING = 'pending',
  VERIFIED = 'verified',
}

export class UserVerification {
  id: string;
  code: string | null;

  type: VerificationType;
  state: VerificationState;

  verifiedAt: Date | null;

  setVerified(verifiedAt = new Date()): void {
    this.verifiedAt = verifiedAt;
    this.state = VerificationState.VERIFIED;
  }
}

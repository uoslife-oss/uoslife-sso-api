export enum VerificationType {
  EMAIL = 'email',
  PORTAL = 'portal',
  DOCUMENT = 'document',
}

export enum VerificationState {
  PENDING = 'pending',
  VERIFIED = 'verified',
}

export type UserVerificationProps = {
  id: string;
  code: string | null;
  type: VerificationType;
  state: VerificationState;
  verifiedAt: Date | null;
  createdAt: Date;
};

export class UserVerification implements UserVerificationProps {
  id: string;
  code: string | null;
  type: VerificationType;
  state: VerificationState;
  verifiedAt: Date | null;
  createdAt: Date;

  setVerified(verifiedAt = new Date()): void {
    this.verifiedAt = verifiedAt;
    this.state = VerificationState.VERIFIED;
  }

  constructor(data: Partial<UserVerificationProps>) {
    this.id = data.id;
    this.code = data.code || null;
    this.type = data.type;
    this.state = data.state;
    this.verifiedAt = data.verifiedAt || null;
    this.createdAt = data.createdAt || new Date();
  }
}

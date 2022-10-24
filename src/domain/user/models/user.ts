import {
  UserAcademicRecord,
  UserAcademicRecordProps,
} from '@domain/user/models/user-academic-record';
import {
  UserPortalAccount,
  UserPortalAccountProps,
} from '@domain/user/models/user-portal-account';
import {
  UserVerification,
  UserVerificationProps,
} from '@domain/user/models/user-verification';

export enum UserType {
  NORMAL = 'normal',
  ORG = 'organization',
  COMPANY = 'company',
  UNIV = 'university',
}

export enum UserState {
  UNVERIFIED = 'unverified',
  NEWBIE = 'newbie',
  VERIFIED = 'verified',
}

export type UserProps = {
  id: string;
  email: string;
  username: string;
  password: string;
  name: string;
  nickname: string | null;
  phoneNumber: string;
  profileImage: string | null;
  state: UserState;
  type: UserType;

  verifications: UserVerificationProps[];
  portalAccounts: UserPortalAccountProps[];
  academicRecords: UserAcademicRecordProps[];
};

export class User implements UserProps {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  name!: string;
  nickname!: string;
  phoneNumber!: string;
  profileImage!: string;
  state!: UserState;
  type!: UserType;

  verifications: UserVerification[];
  portalAccounts: UserPortalAccount[];
  academicRecords: UserAcademicRecord[];

  constructor(data: Partial<UserProps>) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.nickname = data.nickname || null;
    this.phoneNumber = data.phoneNumber;
    this.profileImage = data.profileImage || null;
    this.state = data.state || UserState.UNVERIFIED;
    this.type = data.type || UserType.NORMAL;

    this.verifications = [];
    this.portalAccounts = [];
    this.academicRecords = [];

    if (data.verifications && data.verifications.length > 0) {
      this.verifications = data.verifications.map(
        (x) => new UserVerification(x),
      );
    }

    if (data.portalAccounts && data.portalAccounts.length > 0) {
      this.portalAccounts = data.portalAccounts.map(
        (x) => new UserPortalAccount(x),
      );
    }

    if (data.academicRecords && data.academicRecords.length > 0) {
      this.academicRecords = data.academicRecords.map(
        (x) => new UserAcademicRecord(x),
      );
    }
  }

  getVerificationById(id: string): UserVerification | undefined {
    return this.verifications.find((x) => x.id === id);
  }

  getVerificationByCode(code: string): UserVerification | undefined {
    return this.verifications.find((x) => x.code === code);
  }
}
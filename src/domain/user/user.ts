import { UserVerification } from '@domain/user/user-verification';

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
  }
}

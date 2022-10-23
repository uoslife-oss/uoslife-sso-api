import { ApiProperty } from '@nestjs/swagger';

import { User, UserState, UserType } from '@domain/user';

export class UserRegisterResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  nickname: string | null;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({ nullable: true })
  profileImage: string | null;

  @ApiProperty()
  state: UserState;

  @ApiProperty()
  type: UserType;

  constructor(data: User) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.name = data.name;
    this.nickname = data.nickname;
    this.phoneNumber = data.phoneNumber;
    this.profileImage = data.profileImage;
    this.state = data.state;
    this.type = data.type;
  }
}

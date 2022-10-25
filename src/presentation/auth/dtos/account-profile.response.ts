import { ApiProperty } from '@nestjs/swagger';

import { User, UserState, UserType } from '@domain/user';

export class AccountProfileResponse {
  @ApiProperty({ description: '사용자 ID' })
  id: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '아이디' })
  username: string;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ nullable: true, description: '닉네임' })
  nickname: string | null;

  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;

  @ApiProperty({ nullable: true, description: '프로필 이미지' })
  profileImage: string | null;

  @ApiProperty({ description: '사용자 인증 상태' })
  state: UserState;

  @ApiProperty({ description: '사용자 구분' })
  type: UserType;

  @ApiProperty({ description: '학번', nullable: true })
  studentNumber: string | null;

  @ApiProperty({ description: '전공', nullable: true })
  major: string | null;

  @ApiProperty({ description: '단과대', nullable: true })
  department: string | null;

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

    if (data.academicRecords.length > 0) {
      this.studentNumber = data.academicRecords[0].studentNumber || null;
      this.major = data.academicRecords[0].major || null;
      this.department = data.academicRecords[0].department || null;
    }
  }
}

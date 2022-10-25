import { ApiProperty } from '@nestjs/swagger';

export type AuthLoginResponseProps = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export class AccountLoginResponse {
  @ApiProperty({ description: '인증 토큰' })
  accessToken: string;

  @ApiProperty({ description: '갱신 토큰' })
  refreshToken: string;

  @ApiProperty({ description: '사용자 고윳값' })
  userId: string;

  constructor(data: AuthLoginResponseProps) {
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.userId = data.userId;
  }
}

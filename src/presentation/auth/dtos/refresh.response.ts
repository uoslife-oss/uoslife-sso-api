import { ApiProperty } from '@nestjs/swagger';

import { AuthLoginResponseProps } from '@presentation/auth/dtos/login.response';

export class RefreshResponse {
  @ApiProperty({ description: '인증 토큰' })
  accessToken: string;

  @ApiProperty({ description: '사용자 고윳값' })
  userId: string;

  constructor(data: Omit<AuthLoginResponseProps, 'refreshToken'>) {
    this.accessToken = data.accessToken;
    this.userId = data.userId;
  }
}

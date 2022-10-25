import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class AccountRefreshRequest {
  @ApiProperty({ description: '갱신 토큰' })
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}

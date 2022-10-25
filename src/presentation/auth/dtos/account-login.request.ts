import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccountLoginRequest {
  @ApiProperty({ description: '아이디' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserMigrationRequest {
  @ApiProperty({ description: '구계정 아이디' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: '구계정 비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: '서울시립대 웹메일' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

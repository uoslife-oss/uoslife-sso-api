import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check';

import { passwordValidationRule } from '../../../utils/configs/password';

export class UserRegisterRequest {
  @ApiProperty({ description: '아이디' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @IsNotEmpty()
  @Validate(PasswordValidation, [passwordValidationRule])
  password: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ nullable: true, description: '닉네임' })
  @IsString()
  @IsOptional()
  nickname: string | null;

  @ApiProperty({ description: '전화번호' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiPropertyOptional({ nullable: true, description: '프로필 이미지' })
  @IsString()
  @IsOptional()
  profileImage: string | null;
}

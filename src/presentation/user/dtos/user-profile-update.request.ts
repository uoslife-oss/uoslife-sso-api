import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Validate } from 'class-validator';
import { PasswordValidation } from 'class-validator-password-check';

import { passwordValidationRule } from '../../../utils/configs/password';

import { UpdateUserCommand } from '@application/user/user-core/user-core.command';

export class UserProfileUpdateRequest implements UpdateUserCommand {
  @ApiPropertyOptional({ description: '닉네임' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({
    nullable: true,
    description: '프로필 이미지',
  })
  @IsString()
  @IsOptional()
  profileImage?: string | null;

  @ApiPropertyOptional({
    description: '수정할 비밀번호',
  })
  @IsString()
  @IsOptional()
  @Validate(PasswordValidation, [passwordValidationRule])
  newPassword?: string;
}

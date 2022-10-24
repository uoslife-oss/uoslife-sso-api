import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}

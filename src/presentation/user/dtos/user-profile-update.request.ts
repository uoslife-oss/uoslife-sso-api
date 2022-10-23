import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { UpdateUserCommand } from '@application/user/user.command';

export class UserProfileUpdateRequest implements UpdateUserCommand {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  profileImage?: string | null;
}

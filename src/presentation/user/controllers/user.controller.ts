import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserCoreService } from '@application/user/user-core/user-core.service';
import { UserMigrationRequest } from '@presentation/user/dtos/user-migration.request';
import { UserProfileUpdateRequest } from '@presentation/user/dtos/user-profile-update.request';
import { UserProfileResponse } from '@presentation/user/dtos/user-profile.response';
import { UserRegisterRequest } from '@presentation/user/dtos/user-register.request';

@Controller('users')
@ApiTags('[사용자] 계정')
export class UserController {
  constructor(private readonly userService: UserCoreService) {}

  @Get(':userId')
  @ApiOperation({ summary: '사용자 프로필을 조회합니다.' })
  @ApiOkResponse({ type: UserProfileResponse })
  async getProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserProfileResponse> {
    const result = await this.userService.getProfile(userId);
    return new UserProfileResponse(result);
  }

  @Post()
  @ApiOperation({ summary: '회원가입을 진행합니다.' })
  @ApiOkResponse({ type: UserProfileResponse })
  async register(
    @Body() data: UserRegisterRequest,
  ): Promise<UserProfileResponse> {
    const result = await this.userService.register(data);
    return new UserProfileResponse(result);
  }

  @Post('migration')
  @ApiOperation({ summary: '구계정 마이그레이션을 진행합니다.' })
  @ApiOkResponse({ type: UserProfileResponse })
  async migration(
    @Body() data: UserMigrationRequest,
  ): Promise<UserProfileResponse> {
    const result = await this.userService.registerWithMigration(data);
    return new UserProfileResponse(result);
  }

  @Patch(':userId')
  @ApiOperation({ summary: '회원정보를 수정합니다.' })
  @ApiOkResponse({ type: UserProfileResponse })
  async updateProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() data: UserProfileUpdateRequest,
  ): Promise<UserProfileResponse> {
    const result = await this.userService.updateProfile(userId, data);
    return new UserProfileResponse(result);
  }

  @Delete(':userId')
  @ApiOperation({ summary: '회원탈퇴를 진행합니다.' })
  @ApiOkResponse({ type: Boolean })
  async withdraw(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<boolean> {
    return this.userService.withdraw(userId);
  }
}

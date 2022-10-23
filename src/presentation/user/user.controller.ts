import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { UserService } from '@application/user/user.service';
import { UserRegisterRequest } from '@presentation/user/dtos/user-register.request';
import { UserRegisterResponse } from '@presentation/user/dtos/user-register.response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '회원가입을 진행합니다.' })
  @ApiOkResponse({ type: UserRegisterResponse })
  async register(
    @Body() data: UserRegisterRequest,
  ): Promise<UserRegisterResponse> {
    const result = await this.userService.register(data);
    return new UserRegisterResponse(result);
  }
}

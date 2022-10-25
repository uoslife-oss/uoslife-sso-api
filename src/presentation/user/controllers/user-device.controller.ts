import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthenticatedRequest } from '../../../utils/types/request.type';

import { UserDeviceService } from '@application/user/user-device/user-device.service';
import { DeviceProfileResponse } from '@presentation/user/dtos/device-profile.response';
import { DeviceRegisterRequest } from '@presentation/user/dtos/device-register.request';
import { DeviceRegisterResponse } from '@presentation/user/dtos/device-register.response';
import { DeviceUpdateRequest } from '@presentation/user/dtos/device-update.request';

@Controller('devices')
@ApiTags('[사용자] 기기')
export class UserDeviceController {
  constructor(private readonly deviceService: UserDeviceService) {}

  @Post()
  @ApiOperation({ summary: '계정에 기기를 등록합니다.' })
  @ApiOkResponse({ type: DeviceRegisterResponse })
  async registerDevice(
    @Req() { user }: AuthenticatedRequest,
    @Body() data: DeviceRegisterRequest,
  ): Promise<DeviceRegisterResponse> {
    const result = await this.deviceService.registerDevice({ user, ...data });
    return new DeviceRegisterResponse(result);
  }

  @Get(':deviceId')
  @ApiOperation({ summary: '기기 정보를 조회합니다.' })
  @ApiOkResponse({ type: DeviceProfileResponse })
  getDeviceProfile(
    @Req() { user }: AuthenticatedRequest,
    @Param('deviceId', ParseUUIDPipe) deviceId: string,
  ): DeviceProfileResponse {
    const result = this.deviceService.getDeviceProfile(user, deviceId);
    return new DeviceProfileResponse(result);
  }

  @Patch(':deviceId')
  @ApiOperation({ summary: '기기 정보를 수정합니다.' })
  @ApiOkResponse({ type: DeviceProfileResponse })
  async updateDeviceProfile(
    @Req() { user }: AuthenticatedRequest,
    @Param('deviceId', ParseUUIDPipe) deviceId: string,
    @Body() data: DeviceUpdateRequest,
  ): Promise<DeviceProfileResponse> {
    const result = await this.deviceService.updateDeviceProfile(
      user,
      deviceId,
      data,
    );
    return new DeviceProfileResponse(result);
  }

  @Delete(':deviceId')
  @ApiOperation({ summary: '계정에서 기기를 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  async withdrawDevice(
    @Req() { user }: AuthenticatedRequest,
    @Param('deviceId', ParseUUIDPipe) deviceId: string,
  ): Promise<boolean> {
    return this.deviceService.deleteDevice(user, deviceId);
  }
}

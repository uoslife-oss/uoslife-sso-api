import { ApiProperty } from '@nestjs/swagger';

import { DeviceType } from '@domain/user/models/user-device';

export type DeviceProfileResponseProps = {
  id: string;
  type: DeviceType;
  model: string | null;
  pushToken: string | null;
  buildNumber: number | null;
};

export class DeviceProfileResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: DeviceType })
  type: DeviceType;

  @ApiProperty({ nullable: true })
  model: string | null;

  @ApiProperty({ nullable: true })
  pushToken: string | null;

  @ApiProperty({ nullable: true })
  buildNumber: number | null;

  constructor(data: DeviceProfileResponseProps) {
    this.id = data.id;
    this.type = data.type;
    this.model = data.model || null;
    this.pushToken = data.pushToken || null;
    this.buildNumber = data.buildNumber || null;
  }
}

import { ApiProperty } from '@nestjs/swagger';

export type DeviceRegisterResponseProps = {
  id: string;
  secret: string;
};

export class DeviceRegisterResponse {
  @ApiProperty({ description: '기기 고윳값' })
  id: string;

  @ApiProperty({ description: '기기 비밀키' })
  secret: string;

  constructor(data: DeviceRegisterResponseProps) {
    this.id = data.id;
    this.secret = data.secret;
  }
}

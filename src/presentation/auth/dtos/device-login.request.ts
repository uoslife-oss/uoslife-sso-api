import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeviceLoginRequest {
  @ApiProperty({ description: '기기 고윳값' })
  @IsNotEmpty()
  @IsUUID()
  deviceId: string;

  @ApiProperty({ description: '기기 비밀키' })
  @IsNotEmpty()
  @IsString()
  deviceSecret: string;
}

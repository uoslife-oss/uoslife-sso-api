import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { DeviceType } from '@domain/user/models/user-device';

export class DeviceRegisterRequest {
  @ApiProperty({ enum: DeviceType, description: '기기 종류' })
  @IsNotEmpty()
  @IsEnum(DeviceType)
  type: DeviceType;

  @ApiProperty({ nullable: true, description: '앱 빌드 번호' })
  @IsOptional()
  @IsNumber()
  buildNumber: number | null;

  @ApiProperty({ nullable: true, description: '기기 모델명' })
  @IsOptional()
  @IsString()
  model: string | null;

  @ApiProperty({ nullable: true, description: '푸시 토큰' })
  @IsOptional()
  @IsString()
  pushToken: string | null;
}

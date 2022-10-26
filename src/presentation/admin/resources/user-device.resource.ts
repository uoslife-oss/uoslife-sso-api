import { UserDeviceEntity } from '@infrastructure/user/entities/user-device.entity';
import { Resource } from '@presentation/admin/resources/index';

export const userDeviceResource: Resource<UserDeviceEntity> = {
  resource: UserDeviceEntity,
  options: {
    navigation: { name: '사용자' },
    listProperties: ['id', 'userId', 'model', 'type', 'buildNumber'],
    filterProperties: ['model', 'type', 'buildNumber'],
    editProperties: ['model'],
    showProperties: ['id', 'userId', 'model', 'type', 'buildNumber'],
  },
};

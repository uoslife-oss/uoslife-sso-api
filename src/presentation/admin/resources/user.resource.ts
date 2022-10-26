import { UserEntity } from '@infrastructure/user/entities/user.entity';
import { Resource } from '@presentation/admin/resources/index';

export const userResource: Resource<UserEntity> = {
  resource: UserEntity,
  options: {
    navigation: { name: '사용자' },
    listProperties: [
      'id',
      'name',
      'email',
      'username',
      'nickname',
      'state',
      'type',
    ],
    filterProperties: ['state', 'type'],
    editProperties: ['email', 'username', 'name', 'nickname', 'state', 'type'],
    showProperties: [
      'id',
      'email',
      'username',
      'name',
      'nickname',
      'phoneNumber',
      'state',
      'type',
      'createdAt',
    ],
  },
};

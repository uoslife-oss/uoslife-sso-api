import { userDeviceResource } from '@presentation/admin/resources/user-device.resource';
import { userResource } from '@presentation/admin/resources/user.resource';

export type Resource<T> = {
  resource: any;
  options: {
    id?: string;
    navigation?: {
      name: string;
      icon?: string;
    };
    listProperties: (keyof T)[] | any[];
    filterProperties: (keyof T)[] | any[];
    editProperties: (keyof T)[] | any[];
    showProperties: (keyof T)[] | any[];
  };
};

export const resources: Resource<any>[] = [userResource, userDeviceResource];

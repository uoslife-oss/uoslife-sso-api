import { Injectable } from '@nestjs/common';
import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

import { User, UserType } from '@domain/user';
import { BadUOSLIFECredentialsError } from '@infrastructure/scrap/uoslife/scrap-uoslife.errors';

export type OldAccountCredentials = {
  username: string;
  password: string;
};

export type OldAccountProfile = {
  bottle_black: boolean;
  bottle_block: boolean;
  bottle_block_count: number;
  bottle_blocked_at: string | null;
  bottle_enable: boolean | null;
  canuse_community: boolean;
  educlass_noti_enable: boolean;
  hodock: boolean;
  id: string;
  is_admin: boolean;
  is_undergraduate: boolean;
  is_valid: boolean;
  name: string;
  nickname: string;
  notice_noti_enable: boolean;
  phone: string;
  photo: string;
  portal: boolean;
  processing: boolean;
  sex: string;
  username: string;
};

@Injectable()
export class OldAccountScrapper {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = wrapper(
      axios.create({
        baseURL: 'https://uoslife.com',
        validateStatus: () => true,
        withCredentials: true,
        jar: new CookieJar(),
      }),
    );
  }

  async scrap(credentials: OldAccountCredentials): Promise<User> {
    const { status } = await this.login(credentials);
    if (status !== 200) throw new BadUOSLIFECredentialsError();

    const { data } = await this.getProfile();

    return new User({
      id: data.id,
      username: credentials.username,
      password: credentials.password,
      name: data.name,
      type: UserType.NORMAL,
      phoneNumber: data.phone,
      nickname: data.nickname,
    });
  }

  private async getProfile(): Promise<AxiosResponse<OldAccountProfile>> {
    return this.client.request<OldAccountProfile>({
      url: 'api/me',
      method: 'GET',
    });
  }

  private async login(
    credentials: OldAccountCredentials,
  ): Promise<AxiosResponse> {
    return this.client.request({
      url: 'api/signin',
      method: 'POST',
      data: {
        username: credentials.username,
        password: credentials.password,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { XMLParser } from 'fast-xml-parser';
import { Iconv } from 'iconv';
import { stringify } from 'query-string';
import { CookieJar } from 'tough-cookie';

import { UserAcademicRecord } from '@domain/user/models/user-academic-record';
import { BadPortalCredentialsError } from '@infrastructure/scrap/wise/scrap-wise.errors';

export type PortalAccountCredentials = {
  username: string;
  password: string;
};

@Injectable()
export class PortalAccountScrapper {
  private readonly client: AxiosInstance;
  private readonly parser: XMLParser;

  constructor() {
    this.parser = new XMLParser();
    this.client = wrapper(
      axios.create({
        baseURL: 'https://wise.uos.ac.kr/uosdoc',
        validateStatus: () => true,
        withCredentials: true,
        jar: new CookieJar(),
        responseType: 'arraybuffer',
      }),
    );
    this.client.interceptors.response.use((response) => {
      const iconv = new Iconv('euc-kr', 'utf-8');
      response.data = iconv.convert(response.data);
      return response;
    });
  }

  async scrap(
    credentials: PortalAccountCredentials,
  ): Promise<UserAcademicRecord> {
    await this.loginToPortal(credentials);

    const { data } = await this.getUserFullProfile();
    const { root } = this.parser.parse(data);

    await this.logoutFromPortal();

    if (!root.authDept) throw new BadPortalCredentialsError();

    const major = root.authDept.list.filter(
      (dept) => dept.dept_cd === root.strUserDeptCd,
    )[0];

    return new UserAcademicRecord({
      name: root.strUserNm,
      studentNumber: root.strUserId.toString(),
      major: major.dept_nm_re,
      majorCode: major.dept_cd.toString(),
      department: major.up_nm,
      departmentCode: major.upper_dept_cd.toString(),
    });
  }

  private async getUserFullProfile(): Promise<AxiosResponse> {
    return this.client.request({
      url: 'usr.UsrMasterInq.do',
      method: 'POST',
      data: stringify({
        _code_procList: 'USR15',
        _code_shtmList: 'CMN31',
        _code_cancelList: 'USR18',
        _dept_sust: 'auth',
        _COMMAND_: 'onload',
        _XML_: 'XML',
        _strMenuId: 'stud00040',
      }),
    });
  }

  private async logoutFromPortal(): Promise<AxiosResponse> {
    return this.client.request({
      url: 'com.StuLogin.serv',
      method: 'POST',
      data: stringify({
        _COMMAND_: 'LOGOUT',
        strTarget: 'MAIN',
      }),
    });
  }

  private async loginToPortal(
    data: PortalAccountCredentials,
  ): Promise<AxiosResponse> {
    return this.client.request({
      url: 'com.StuLogin.serv',
      method: 'POST',
      data: stringify({
        _COMMAND_: 'LOGIN',
        strTarget: 'MAIN',
        strIpAddr: '1.1.1.1',
        strMacAddr: '1.0.0.1',
        strLoginId: data.username,
        strLoginPw: data.password,
      }),
    });
  }
}

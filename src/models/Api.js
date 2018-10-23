import DeviceService from './devices/DeviceService';
import HttpClient from './HttpClient';
import OrgService from './orgs/OrgService';
import ProjectService from './projects/ProjectService';
import UserService from './user/UserService';

export default class Api {
  constructor() {
    this.http = new HttpClient('/api');
    this.devices = new DeviceService(this.http);
    this.orgs = new OrgService(this.http);
    this.projects = new ProjectService(this.http);
    this.user = new UserService(this.http);
  }

  setToken({ accessToken, refreshToken }) {
    this.http.setHeader('Authorization', `Bearer ${accessToken}`);
    this.http.onError(async error => {
      if (error.response.status === 401) {
        await refreshToken();
        const response = await this.http.retry(error.config);
        return response;
      }
      throw error;
    });
  }

  removeToken() {
    this.http.removeHeader('Authorization');
    this.http.offError();
  }
}

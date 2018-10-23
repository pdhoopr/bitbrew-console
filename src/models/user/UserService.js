import { userDetailsPath } from '../../utils/urls';
import TokenService from './TokenService';

export default class UserService {
  constructor(http) {
    this.http = http;
    this.token = new TokenService(this.http);
  }

  view = token =>
    this.http.get(userDetailsPath, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}

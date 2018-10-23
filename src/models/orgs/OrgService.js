import { orgDetailsPath, orgsPath } from '../../utils/urls';
import MemberService from './MemberService';

export default class OrgService {
  constructor(http) {
    this.http = http;
    this.members = new MemberService(this.http);
  }

  list = () =>
    this.http.get(orgsPath, {
      params: {
        pageSize: 500,
      },
    });

  create = data => this.http.post(orgsPath, data);

  update = (orgId, data) => this.http.put(orgDetailsPath(orgId), data);

  delete = orgId => this.http.delete(orgDetailsPath(orgId));
}

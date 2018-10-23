import { orgMembersPath } from '../../utils/urls';

export default class MemberService {
  constructor(http) {
    this.http = http;
  }

  list = orgId =>
    this.http.get(orgMembersPath(orgId), {
      params: {
        pageSize: 500,
      },
    });
}

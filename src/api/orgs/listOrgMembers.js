import http from "../settings/http";

export default function listOrgMembers(id, params) {
  return http.paginate(`/orgs/${id}/members`, params);
}

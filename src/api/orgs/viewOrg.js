import http from "../settings/http";

export default function viewOrg(id) {
  return http.get(`/orgs/${id}`);
}

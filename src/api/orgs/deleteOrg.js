import http from "../settings/http";

export default function deleteOrg(id) {
  return http.delete(`/orgs/${id}`);
}

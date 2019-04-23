import http from "../settings/http";

export default function updateOrg(id, data) {
  return http.put(`/orgs/${id}`, data);
}

import http from "../settings/http";

export default function deleteRule(id) {
  return http.delete(`/rules/${id}`);
}

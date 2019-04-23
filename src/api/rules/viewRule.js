import http from "../settings/http";

export default function viewRule(id) {
  return http.get(`/rules/${id}`);
}

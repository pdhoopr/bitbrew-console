import http from "../settings/http";

export default function viewProject(id) {
  return http.get(`/projects/${id}`);
}

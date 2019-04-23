import http from "../settings/http";

export default function updateProject(id, data) {
  return http.put(`/projects/${id}`, data);
}

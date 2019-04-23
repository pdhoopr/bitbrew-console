import http from "../settings/http";

export default function deleteProject(id) {
  return http.delete(`/projects/${id}`);
}

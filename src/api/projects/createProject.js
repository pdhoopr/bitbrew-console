import http from "../settings/http";

export default function createProject(data) {
  return http.post("/projects", data);
}

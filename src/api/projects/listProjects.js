import http from "../settings/http";

export default function listProjects(orgId, params) {
  return http.paginate("/projects", { ...params, orgId });
}

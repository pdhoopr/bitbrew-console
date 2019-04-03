import http from "../settings/http";

export default async function listProjects(orgId, params) {
  const response = await http.paginate("/projects", { ...params, orgId });
  return response.data;
}

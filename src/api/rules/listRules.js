import http from "../settings/http";

export default async function listRules(projectId, params) {
  const response = await http.paginate("/rules", { ...params, projectId });
  return response.data;
}

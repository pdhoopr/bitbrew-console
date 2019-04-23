import http from "../settings/http";

export default function listRules(projectId, params) {
  return http.paginate("/rules", { ...params, projectId });
}

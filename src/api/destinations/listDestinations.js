import http from "../settings/http";

export default function listDestinations(projectId, params) {
  return http.paginate("/destinations", { ...params, projectId });
}

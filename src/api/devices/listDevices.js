import http from "../settings/http";

export default function listDevices(projectId, params) {
  return http.paginate("/devices", { ...params, projectId });
}

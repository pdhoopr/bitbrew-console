import http from "../settings/http";

export default async function listDevices(projectId, params) {
  const response = await http.paginate("/devices", { ...params, projectId });
  return response.data;
}

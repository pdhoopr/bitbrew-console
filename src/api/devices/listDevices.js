import http from "../settings/http";

export default async function listDevices(projectId) {
  const response = await http.get("/devices", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
  return response.data;
}

import http from "../settings/http";

export default async function listDestinations(projectId) {
  const response = await http.get("/destinations", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
  return response.data;
}

import http from "../settings/http";

export default async function listDestinations(projectId, params) {
  const response = await http.paginate("/destinations", {
    ...params,
    projectId,
  });
  return response.data;
}

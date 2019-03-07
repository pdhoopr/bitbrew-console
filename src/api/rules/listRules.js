import http from "../settings/http";

export default async function listRules(projectId) {
  const response = await http.get("/rules", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
  return response.data;
}

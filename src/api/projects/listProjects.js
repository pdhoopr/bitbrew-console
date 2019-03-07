import http from "../settings/http";

export default async function listProjects(orgId) {
  const response = await http.get("/projects", {
    params: {
      orgId,
      pageSize: 50,
    },
  });
  return response.data;
}

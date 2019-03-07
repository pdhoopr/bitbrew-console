import http from "../settings/http";

export default async function viewProject(id) {
  const response = await http.get(`/projects/${id}`);
  return response.data;
}

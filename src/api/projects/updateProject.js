import http from "../settings/http";

export default async function updateProject(id, data) {
  const response = await http.put(`/projects/${id}`, data);
  return response.data;
}

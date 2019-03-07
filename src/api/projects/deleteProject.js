import http from "../settings/http";

export default async function deleteProject(id) {
  const response = await http.delete(`/projects/${id}`);
  return response.data;
}

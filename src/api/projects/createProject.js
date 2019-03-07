import http from "../settings/http";

export default async function createProject(data) {
  const response = await http.post("/projects", data);
  return response.data;
}

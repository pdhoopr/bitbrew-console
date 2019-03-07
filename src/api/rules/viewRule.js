import http from "../settings/http";

export default async function viewRule(id) {
  const response = await http.get(`/rules/${id}`);
  return response.data;
}

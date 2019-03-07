import http from "../settings/http";

export default async function deleteRule(id) {
  const response = await http.delete(`/rules/${id}`);
  return response.data;
}

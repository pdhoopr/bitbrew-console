import http from "../settings/http";

export default async function updateOrg(id, data) {
  const response = await http.put(`/orgs/${id}`, data);
  return response.data;
}

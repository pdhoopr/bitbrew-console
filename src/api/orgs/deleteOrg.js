import http from "../settings/http";

export default async function deleteOrg(id) {
  const response = await http.delete(`/orgs/${id}`);
  return response.data;
}

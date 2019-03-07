import http from "../settings/http";

export default async function viewOrg(id) {
  const response = await http.get(`/orgs/${id}`);
  return response.data;
}

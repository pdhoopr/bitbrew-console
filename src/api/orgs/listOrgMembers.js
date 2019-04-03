import http from "../settings/http";

export default async function listOrgMembers(id, params) {
  const response = await http.paginate(`/orgs/${id}/members`, params);
  return response.data;
}

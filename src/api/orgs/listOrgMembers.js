import http from "../settings/http";

export default async function listOrgMembers(id) {
  const response = await http.get(`/orgs/${id}/members`, {
    params: {
      pageSize: 50,
    },
  });
  return response.data;
}

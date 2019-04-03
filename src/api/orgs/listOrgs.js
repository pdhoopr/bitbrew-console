import http from "../settings/http";

export default async function listOrgs(params) {
  const response = await http.paginate("/orgs", params);
  return response.data;
}

import http from "../settings/http";

export default async function createOrg(data) {
  const response = await http.post("/orgs", data);
  return response.data;
}

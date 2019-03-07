import http from "../settings/http";

export default async function listOrgs() {
  const response = await http.get("/orgs", {
    params: {
      pageSize: 10,
    },
  });
  return response.data;
}

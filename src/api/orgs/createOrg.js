import http from "../settings/http";

export default function createOrg(data) {
  return http.post("/orgs", data);
}

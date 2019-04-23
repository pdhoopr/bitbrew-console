import http from "../settings/http";

export default function listOrgs(params) {
  return http.paginate("/orgs", params);
}

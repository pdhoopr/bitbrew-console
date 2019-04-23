import http from "../settings/http";

export default function viewDestination(id) {
  return http.get(`/destinations/${id}`);
}

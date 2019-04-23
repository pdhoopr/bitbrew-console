import http from "../settings/http";

export default function deleteDestination(id) {
  return http.delete(`/destinations/${id}`);
}

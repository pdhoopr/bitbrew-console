import http from "../settings/http";

export default function updateDestination(id, data) {
  return http.put(`/destinations/${id}`, data);
}

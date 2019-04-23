import http from "../settings/http";

export default function createDestination(data) {
  return http.post("/destinations", data);
}

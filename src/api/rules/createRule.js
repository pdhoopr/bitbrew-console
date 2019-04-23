import http from "../settings/http";

export default function createRule(data) {
  return http.post("/rules", data);
}

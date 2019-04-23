import http from "../settings/http";

export default function createDevice(data) {
  return http.post("/devices", data);
}

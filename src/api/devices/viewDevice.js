import http from "../settings/http";

export default function viewDevice(id) {
  return http.get(`/devices/${id}`);
}

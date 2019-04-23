import http from "../settings/http";

export default function updateDevice(id, data) {
  return http.put(`/devices/${id}`, data);
}

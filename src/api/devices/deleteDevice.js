import http from "../settings/http";

export default function deleteDevice(id) {
  return http.delete(`/devices/${id}`);
}

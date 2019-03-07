import http from "../settings/http";

export default async function updateDevice(id, data) {
  const response = await http.put(`/devices/${id}`, data);
  return response.data;
}

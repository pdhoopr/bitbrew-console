import http from "../settings/http";

export default async function deleteDevice(id) {
  const response = await http.delete(`/devices/${id}`);
  return response.data;
}

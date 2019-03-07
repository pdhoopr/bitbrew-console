import http from "../settings/http";

export default async function viewDevice(id) {
  const response = await http.get(`/devices/${id}`);
  return response.data;
}

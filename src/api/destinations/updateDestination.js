import http from "../settings/http";

export default async function updateDestination(id, data) {
  const response = await http.put(`/destinations/${id}`, data);
  return response.data;
}

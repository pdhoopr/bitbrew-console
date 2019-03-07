import http from "../settings/http";

export default async function deleteDestination(id) {
  const response = await http.delete(`/destinations/${id}`);
  return response.data;
}

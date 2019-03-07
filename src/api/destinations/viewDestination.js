import http from "../settings/http";

export default async function viewDestination(id) {
  const response = await http.get(`/destinations/${id}`);
  return response.data;
}

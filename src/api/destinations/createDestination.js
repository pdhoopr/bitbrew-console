import http from "../settings/http";

export default async function createDestination(data) {
  const response = await http.post("/destinations", data);
  return response.data;
}

import http from "../settings/http";

export default async function createDevice(data) {
  const response = await http.post("/devices", data);
  return response.data;
}

import http from "../settings/http";

export default async function createRule(data) {
  const response = await http.post("/rules", data);
  return response.data;
}

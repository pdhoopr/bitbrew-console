import http from "../settings/http";

export default function viewSelf() {
  return http.get("/user");
}

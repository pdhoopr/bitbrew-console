import http from "./http";

export default function setPageSize(pageSize) {
  http.defaults.pageSize = pageSize;
}

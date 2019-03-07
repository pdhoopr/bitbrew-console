import http from "./http";

export default function setBaseUrl(url) {
  http.defaults.baseURL = url;
}

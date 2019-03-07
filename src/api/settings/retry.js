import http from "./http";

export default function retry(error) {
  const config = { ...error.config };
  config.baseURL = undefined;
  config.headers.Authorization = http.defaults.headers.common.Authorization;
  return http.request(config);
}

import {
  getHeader,
  removeHeader,
  request,
  setHeader,
  setOption,
} from "./httpClient";

export function setBaseUrl(url) {
  setOption("baseURL", url);
}

export function setToken(token) {
  setHeader("Authorization", `Bearer ${token}`);
}

export function removeToken() {
  removeHeader("Authorization");
}

export function retry(error) {
  const options = { ...error.config };
  options.baseURL = undefined;
  options.headers.Authorization = getHeader("Authorization");
  return request(options);
}

export * from "./deviceService";
export {
  addEventListener as on,
  removeEventListener as off,
} from "./httpClient";
export * from "./orgService";
export * from "./projectService";

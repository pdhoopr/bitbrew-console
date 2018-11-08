import axios from "axios";

const instance = axios.create();

const listeners = {
  request: new Map(),
  response: new Map(),
  error: new Map(),
};

function getData(response) {
  return response.data;
}

export function setOption(name, value) {
  instance.defaults[name] = value;
}

export function getHeader(name) {
  return instance.defaults.headers.common[name];
}

export function setHeader(name, value) {
  instance.defaults.headers.common[name] = value;
}

export function removeHeader(name) {
  delete instance.defaults.headers.common[name];
}

export function addEventListener(type, listener) {
  const scopedListeners = listeners[type];
  if (scopedListeners && !scopedListeners.has(listener)) {
    const id =
      type === "error"
        ? instance.interceptors.response.use(response => response, listener)
        : instance.interceptors[type].use(listener);
    scopedListeners.set(listener, id);
  }
}

export function removeEventListener(type, listener) {
  const scopedListeners = listeners[type];
  if (scopedListeners && scopedListeners.has(listener)) {
    const id = scopedListeners.get(listener);
    instance.interceptors[type === "error" ? "response" : type].eject(id);
    scopedListeners.delete(listener);
  }
}

export function request(config) {
  return instance.request(config);
}

export function get(url, config) {
  return instance.get(url, config).then(getData);
}

export function post(url, data) {
  return instance.post(url, data).then(getData);
}

export function put(url, data) {
  return instance.put(url, data).then(getData);
}

export function del(url) {
  return instance.delete(url).then(getData);
}

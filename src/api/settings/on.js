import eventListeners from "./eventListeners";
import http from "./http";

export default function on(type, listener) {
  const scopedListeners = eventListeners[type];
  if (scopedListeners && !scopedListeners.has(listener)) {
    const id =
      type === "error"
        ? http.interceptors.response.use(response => response, listener)
        : http.interceptors[type].use(listener);
    scopedListeners.set(listener, id);
  }
}

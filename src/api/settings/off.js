import eventListeners from "./eventListeners";
import http from "./http";

export default function off(type, listener) {
  const scopedListeners = eventListeners[type];
  if (scopedListeners && scopedListeners.has(listener)) {
    const id = scopedListeners.get(listener);
    http.interceptors[type === "error" ? "response" : type].eject(id);
    scopedListeners.delete(listener);
  }
}

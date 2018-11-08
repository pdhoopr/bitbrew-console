import { del, get, post, put } from "./httpClient";

export function listDevices(projectId) {
  return get("/devices", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
}

export function viewDevice(id) {
  return get(`/devices/${id}`);
}

export function createDevice(data) {
  return post("/devices", data);
}

export function updateDevice(id, data) {
  return put(`/devices/${id}`, data);
}

export function deleteDevice(id) {
  return del(`/devices/${id}`);
}

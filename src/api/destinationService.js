import { del, get, post, put } from "./httpClient";

export function listDestinations(projectId) {
  return get("/destinations", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
}

export function viewDestination(id) {
  return get(`/destinations/${id}`);
}

export function createDestination(data) {
  return post("/destinations", data);
}

export function updateDestination(id, data) {
  return put(`/destinations/${id}`, data);
}

export function deleteDestination(id) {
  return del(`/destinations/${id}`);
}

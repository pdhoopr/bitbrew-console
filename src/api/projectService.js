import { del, get, post, put } from "./httpClient";

export function listProjects(orgId) {
  return get("/projects", {
    params: {
      orgId,
      pageSize: 50,
    },
  });
}

export function viewProject(id) {
  return get(`/projects/${id}`);
}

export function createProject(data) {
  return post("/projects", data);
}

export function updateProject(id, data) {
  return put(`/projects/${id}`, data);
}

export function deleteProject(id) {
  return del(`/projects/${id}`);
}

import { del, get, post, put } from "./httpClient";

export function listOrgs() {
  return get("/orgs", {
    params: {
      pageSize: 10,
    },
  });
}

export function viewOrg(id) {
  return get(`/orgs/${id}`);
}

export function createOrg(data) {
  return post("/orgs", data);
}

export function updateOrg(id, data) {
  return put(`/orgs/${id}`, data);
}

export function deleteOrg(id) {
  return del(`/orgs/${id}`);
}

export function listOrgMembers(id) {
  return get(`/orgs/${id}/members`, {
    params: {
      pageSize: 50,
    },
  });
}

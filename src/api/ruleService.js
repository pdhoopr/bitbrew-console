import { del, get, post } from "./httpClient";

// eslint-disable-next-line import/prefer-default-export
export function listRules(projectId) {
  return get("/rules", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
}

export function viewRule(id) {
  return get(`/rules/${id}`);
}

export function createRule(data) {
  return post("/rules", data);
}

export function deleteRule(id) {
  return del(`/rules/${id}`);
}

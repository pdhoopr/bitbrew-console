import { get } from "./httpClient";

// eslint-disable-next-line import/prefer-default-export
export function listRules(projectId) {
  return get("/rules", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
}

import { get } from "./httpClient";

// eslint-disable-next-line import/prefer-default-export
export function listDestinations(projectId) {
  return get("/destinations", {
    params: {
      projectId,
      pageSize: 50,
    },
  });
}

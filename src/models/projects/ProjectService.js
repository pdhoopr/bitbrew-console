import { projectDetailsPath, projectsPath } from '../../utils/urls';

export default class ProjectService {
  constructor(http) {
    this.http = http;
  }

  list = orgId =>
    this.http.get(projectsPath, {
      params: {
        orgId,
        pageSize: 500,
      },
    });

  create = data => this.http.post(projectsPath, data);

  update = (projectId, data) =>
    this.http.put(projectDetailsPath(projectId), data);

  delete = projectId => this.http.delete(projectDetailsPath(projectId));
}

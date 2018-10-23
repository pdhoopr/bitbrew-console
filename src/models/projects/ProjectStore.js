import { flow, getEnv, types } from 'mobx-state-tree';
import ProjectState from './ProjectState';

export default types
  .model('ProjectStore', {
    projectMap: types.optional(types.map(ProjectState), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get projects() {
      return [...self.projectMap.values()].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
    getProjectWithId(projectId) {
      return self.projectMap.get(projectId) || null;
    },
  }))
  .actions(self => ({
    setProject({ orgId, ...project }) {
      self.projectMap.set(project.id, {
        ...project,
        org: orgId,
      });
    },
    removeProject(project) {
      project.removeReferences();
      self.projectMap.delete(project.id);
    },
    listProjects: flow(function* listProjects(org) {
      const response = yield self.api.projects.list(org.id);
      response.items.forEach(self.setProject);
    }),
    createProject: flow(function* createProject(data) {
      const response = yield self.api.projects.create(data);
      self.setProject(response);
    }),
    updateProject: flow(function* updateProject(project, data) {
      const response = yield self.api.projects.update(project.id, data);
      self.setProject(response);
    }),
    deleteProject: flow(function* deleteProject(project) {
      yield self.api.projects.delete(project.id);
      self.removeProject(project);
    }),
  }));

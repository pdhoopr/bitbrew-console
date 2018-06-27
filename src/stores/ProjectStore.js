import { types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';
import { OrgImpl } from './OrgStore';

export const ProjectImpl = types.model('ProjectImpl', {
  id: types.identifier(types.refinement(types.string, matchesUuid)),
  name: types.string,
  description: types.string,
  createdAt: types.refinement(types.string, matchesDate),
  org: types.reference(OrgImpl),
});

export default types
  .model('ProjectStore', {
    projectMap: types.optional(types.map(ProjectImpl), {}),
  })
  .views(self => ({
    get projects() {
      return [...self.projectMap.values()].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
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
      self.projectMap.delete(project.id);
    },
    replaceProjects(projects) {
      projects.forEach(self.setProject);
    },
    clearProjects(projects) {
      projects.forEach(self.removeProject);
    },
  }));

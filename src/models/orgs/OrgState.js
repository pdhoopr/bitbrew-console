import { flow, getEnv, getRoot, types } from 'mobx-state-tree';
import { isDate, isUuid } from '../../utils/validators';
import MemberState from './MemberState';

export default types
  .model('OrgState', {
    id: types.refinement(types.identifier, isUuid),
    name: types.string,
    createdAt: types.refinement(types.string, isDate),
    memberMap: types.optional(types.map(MemberState), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get members() {
      return [...self.memberMap.values()].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    },
    get projectStore() {
      return getRoot(self).projectStore;
    },
    get projects() {
      return self.projectStore.projects.filter(project => project.org === self);
    },
    getProjectsWithName(name) {
      return self.projects.filter(project =>
        project.name.toUpperCase().includes(name.toUpperCase()),
      );
    },
  }))
  .actions(self => ({
    removeReferences() {
      self.projects.forEach(self.projectStore.removeProject);
    },
    setMember(member) {
      self.memberMap.set(member.id, member);
    },
    removeMember(member) {
      self.memberMap.delete(member.id);
    },
    listMembers: flow(function* listMembers() {
      const response = yield self.api.orgs.members.list(self.id);
      response.items.forEach(self.setMember);
    }),
  }));

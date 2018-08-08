import { types } from 'mobx-state-tree';
import AuthStore from './AuthStore';
import OrgStore from './OrgStore';
import ProjectStore from './ProjectStore';

export default types.model('RootStore', {
  authStore: types.optional(AuthStore, {}),
  orgStore: types.optional(OrgStore, {}),
  projectStore: types.optional(ProjectStore, {}),
});

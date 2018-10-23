import { types } from 'mobx-state-tree';
import DeviceStore from './devices/DeviceStore';
import OrgStore from './orgs/OrgStore';
import ProjectStore from './projects/ProjectStore';
import UiStore from './ui/UiStore';
import UserStore from './user/UserStore';

export default types.model('Stores', {
  deviceStore: types.optional(DeviceStore, {}),
  orgStore: types.optional(OrgStore, {}),
  projectStore: types.optional(ProjectStore, {}),
  uiStore: types.optional(UiStore, {}),
  userStore: types.optional(UserStore, {}),
});

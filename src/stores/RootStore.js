import { types } from 'mobx-state-tree';
import AuthStore from './AuthStore';
import DeviceStore from './DeviceStore';
import OrgStore from './OrgStore';
import ProjectStore from './ProjectStore';
import UiStore from './UiStore';

export default types.model('RootStore', {
  authStore: types.optional(AuthStore, {}),
  deviceStore: types.optional(DeviceStore, {}),
  orgStore: types.optional(OrgStore, {}),
  projectStore: types.optional(ProjectStore, {}),
  uiStore: types.optional(UiStore, {}),
});

import { getRoot, types } from 'mobx-state-tree';
import { isDate, isUuid } from '../../utils/validators';
import OrgState from '../orgs/OrgState';

export default types
  .model('ProjectState', {
    id: types.refinement(types.identifier, isUuid),
    name: types.string,
    description: types.string,
    usesSimulatedDevices: types.boolean,
    createdAt: types.refinement(types.string, isDate),
    org: types.reference(OrgState),
  })
  .views(self => ({
    get deviceStore() {
      return getRoot(self).deviceStore;
    },
    get devices() {
      return self.deviceStore.devices.filter(device => device.project === self);
    },
  }))
  .actions(self => ({
    removeReferences() {
      self.devices.forEach(self.deviceStore.removeDevice);
    },
  }));

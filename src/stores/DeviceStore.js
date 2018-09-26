import { flow, getEnv, types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';
import { ProjectImpl } from './ProjectStore';

export const DeviceImpl = types.model('DeviceImpl', {
  id: types.refinement(types.identifier, matchesUuid),
  codename: types.string,
  createdAt: types.refinement(types.string, matchesDate),
  enabled: types.boolean,
  type: types.string,
  project: types.reference(ProjectImpl),
});

export default types
  .model('DeviceStore', {
    deviceMap: types.optional(types.map(DeviceImpl), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get devices() {
      return [...self.deviceMap.values()].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
  }))
  .actions(self => ({
    setDevice({ projectId, ...device }) {
      self.deviceMap.set(device.id, {
        ...device,
        project: projectId,
      });
    },
    removeDevice(device) {
      self.deviceMap.delete(device.id);
    },
    listDevices: flow(function* listDevices(project) {
      const response = yield self.api.listDevices(project.id);
      response.items.forEach(self.setDevice);
    }),
    createDevice: flow(function* createDevice(data) {
      const response = yield self.api.createDevice(data);
      self.setDevice(response);
    }),
  }));

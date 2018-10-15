import { flow, getEnv, types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';
import { ProjectImpl } from './ProjectStore';

export const DeviceImpl = types.model('DeviceImpl', {
  id: types.refinement(types.identifier, matchesUuid),
  codename: types.string,
  createdAt: types.refinement(types.string, matchesDate),
  enabled: types.boolean,
  type: types.string,
  serialNumber: types.string,
  imei: types.string,
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
    getDeviceWithId(deviceId) {
      return self.deviceMap.get(deviceId) || null;
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
    updateDevice: flow(function* updateDevice(device, data) {
      const response = yield self.api.updateDevice(device.id, data);
      self.setDevice(response);
    }),
    deleteDevice: flow(function* deleteDevice(device) {
      yield self.api.deleteDevice(device.id);
      self.removeDevice(device);
    }),
  }));

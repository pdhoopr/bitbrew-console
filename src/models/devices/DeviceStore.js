import { flow, getEnv, types } from 'mobx-state-tree';
import DeviceState from './DeviceState';

export default types
  .model('DeviceStore', {
    deviceMap: types.optional(types.map(DeviceState), {}),
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
      const response = yield self.api.devices.list(project.id);
      response.items.forEach(self.setDevice);
    }),
    createDevice: flow(function* createDevice(data) {
      const response = yield self.api.devices.create(data);
      self.setDevice(response);
    }),
    updateDevice: flow(function* updateDevice(device, data) {
      const response = yield self.api.devices.update(device.id, data);
      self.setDevice(response);
    }),
    deleteDevice: flow(function* deleteDevice(device) {
      yield self.api.devices.delete(device.id);
      self.removeDevice(device);
    }),
  }));

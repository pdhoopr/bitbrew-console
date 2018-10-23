import { deviceDetailsPath, devicesPath } from '../../utils/urls';

export default class DeviceService {
  constructor(http) {
    this.http = http;
  }

  list = projectId =>
    this.http.get(devicesPath, {
      params: {
        projectId,
        pageSize: 500,
      },
    });

  create = data => this.http.post(devicesPath, data);

  update = (deviceId, data) => this.http.put(deviceDetailsPath(deviceId), data);

  delete = deviceId => this.http.delete(deviceDetailsPath(deviceId));
}

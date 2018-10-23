import { types } from 'mobx-state-tree';
import { isDate, isUuid } from '../../utils/validators';
import ProjectState from '../projects/ProjectState';

export default types.model('DeviceState', {
  id: types.refinement(types.identifier, isUuid),
  codename: types.string,
  createdAt: types.refinement(types.string, isDate),
  enabled: types.boolean,
  type: types.string,
  serialNumber: types.string,
  imei: types.string,
  project: types.reference(ProjectState),
});

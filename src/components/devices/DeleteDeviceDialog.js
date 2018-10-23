import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '../../utils/helpers';
import { projectDevicesPath } from '../../utils/urls';
import DeleteDialog from '../ui/DeleteDialog';
import Panel from '../ui/Panel';
import { Text } from '../ui/Texts';

function DeleteDeviceDialog({ deleteDevice, device }) {
  return (
    <DeleteDialog
      title="Delete Device"
      onDelete={async () => {
        const projectId = device.project.id;
        await deleteDevice(device);
        navigate(projectDevicesPath(projectId));
      }}
    >
      <Text>
        The following device will be permanently deleted, and the platform will
        no longer accept any data sent from this device:
      </Text>
      <Panel
        items={[
          ['Device', device.codename],
          ['Project', device.project.name],
          ['Organization', device.project.org.name],
        ]}
      />
      <Text>Are you sure you want to continue?</Text>
    </DeleteDialog>
  );
}

DeleteDeviceDialog.propTypes = {
  deleteDevice: PropTypes.func.isRequired,
  device: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    project: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      org: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(
  DeleteDeviceDialog,
  ({ deviceStore }) => ({
    deleteDevice: deviceStore.deleteDevice,
  }),
);

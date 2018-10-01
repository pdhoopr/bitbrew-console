import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import DeleteModal from '../components/DeleteModal';
import Panel from '../components/Panel';
import { Text } from '../components/Texts';
import { connect } from '../utils/tools';
import { projectDevicesPath } from '../utils/urls';

class DeleteDeviceScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  tryToDeleteDevice = async () => {
    const projectId = this.props.device.project.id;
    await this.props.deleteDevice(this.props.device);
    this.props.close();
    navigate(projectDevicesPath(projectId));
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close, device } = this.props;
    return (
      <DeleteModal
        title="Delete Device"
        onDelete={this.tryToDeleteDevice}
        close={close}
      >
        <Text>
          The following device will be permanently deleted, and the platform
          will no longer accept any data sent from this device:
        </Text>
        <Panel
          items={[
            ['Device', device.codename],
            ['Project', device.project.name],
            ['Organization', device.project.org.name],
          ]}
        />
        <Text>Are you sure you want to continue?</Text>
      </DeleteModal>
    );
  }
}

DeleteDeviceScreen.propTypes = {
  close: PropTypes.func.isRequired,
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
  DeleteDeviceScreen,
  ({ deviceStore }) => ({
    deleteDevice: deviceStore.deleteDevice,
  }),
);

import PropTypes from 'prop-types';
import React from 'react';
import DeviceFields from '../components/DeviceFields';
import ModalForm from '../components/ModalForm';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class EditDeviceScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormStore
    // prettier-ignore
    .props({
      codename: this.props.device.codename,
      type: this.props.device.type,
      serialNumber: this.props.device.serialNumber,
      imei: this.props.device.imei,
      enabled: this.props.device.enabled,
      projectId: this.props.device.project.id,
    })
    .create();

  tryToUpdateDevice = event => {
    event.preventDefault();
    this.props.errorBoundary(async () => {
      await this.props.updateDevice(this.props.device, this.form.serialized);
      this.props.close();
    });
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close } = this.props;
    return (
      <ModalForm
        title="Edit Device"
        buttonText="Save"
        onSubmit={this.tryToUpdateDevice}
        close={close}
      >
        <DeviceFields form={this.form} />
      </ModalForm>
    );
  }
}

EditDeviceScreen.propTypes = {
  close: PropTypes.func.isRequired,
  device: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    imei: PropTypes.string.isRequired,
    project: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    serialNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  errorBoundary: PropTypes.func.isRequired,
  updateDevice: PropTypes.func.isRequired,
};

export default connect(
  EditDeviceScreen,
  ({ deviceStore, uiStore }) => ({
    errorBoundary: uiStore.errorBoundary,
    updateDevice: deviceStore.updateDevice,
  }),
);

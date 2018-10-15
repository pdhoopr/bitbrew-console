import PropTypes from 'prop-types';
import React from 'react';
import DeviceFields from '../components/DeviceFields';
import ModalForm from '../components/ModalForm';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class NewDeviceScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormStore
    // prettier-ignore
    .props({
      codename: '',
      type: 'Datalogger',
      serialNumber: '',
      imei: '',
      enabled: true,
      projectId: this.props.project.id,
    })
    .create();

  tryToCreateDevice = event => {
    event.preventDefault();
    this.props.errorBoundary(async () => {
      await this.props.createDevice(this.form.serialized);
      this.props.close();
    });
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close } = this.props;
    return (
      <ModalForm
        title="New Device"
        buttonText="Create"
        onSubmit={this.tryToCreateDevice}
        close={close}
      >
        <DeviceFields form={this.form} />
      </ModalForm>
    );
  }
}

NewDeviceScreen.propTypes = {
  close: PropTypes.func.isRequired,
  createDevice: PropTypes.func.isRequired,
  errorBoundary: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  NewDeviceScreen,
  ({ deviceStore, uiStore }) => ({
    createDevice: deviceStore.createDevice,
    errorBoundary: uiStore.errorBoundary,
  }),
);

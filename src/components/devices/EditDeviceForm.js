import PropTypes from 'prop-types';
import React from 'react';
import FormState from '../../models/ui/FormState';
import { connect } from '../../utils/helpers';
import FormDrawer from '../ui/FormDrawer';
import DeviceFormFields from './DeviceFormFields';

class EditDeviceForm extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormState.props({
    codename: this.props.device.codename,
    type: this.props.device.type,
    serialNumber: this.props.device.serialNumber,
    imei: this.props.device.imei,
    enabled: this.props.device.enabled,
    projectId: this.props.device.project.id,
  }).create();

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { device, updateDevice } = this.props;
    return (
      <FormDrawer
        title="Edit Device"
        buttonText="Save"
        onSubmit={() => updateDevice(device, this.form.serialized)}
      >
        <DeviceFormFields form={this.form} />
      </FormDrawer>
    );
  }
}

EditDeviceForm.propTypes = {
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
  updateDevice: PropTypes.func.isRequired,
};

export default connect(
  EditDeviceForm,
  ({ deviceStore }) => ({
    updateDevice: deviceStore.updateDevice,
  }),
);

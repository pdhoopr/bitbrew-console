import PropTypes from 'prop-types';
import React from 'react';
import FormState from '../../models/ui/FormState';
import { connect } from '../../utils/helpers';
import FormDrawer from '../ui/FormDrawer';
import DeviceFormFields from './DeviceFormFields';

class NewDeviceForm extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormState.props({
    codename: '',
    type: 'Datalogger',
    serialNumber: '',
    imei: '',
    enabled: true,
    projectId: this.props.project.id,
  }).create();

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { createDevice } = this.props;
    return (
      <FormDrawer
        title="New Device"
        buttonText="Create"
        onSubmit={() => createDevice(this.form.serialized)}
      >
        <DeviceFormFields form={this.form} />
      </FormDrawer>
    );
  }
}

NewDeviceForm.propTypes = {
  createDevice: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  NewDeviceForm,
  ({ deviceStore }) => ({
    createDevice: deviceStore.createDevice,
  }),
);

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Input, Label } from '../components/Forms';
import { CheckedRadioButtonIcon } from '../components/Icons';
import ModalForm from '../components/ModalForm';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

export const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  margin-bottom: var(--size-16);
  padding: 0;
`;

export const Legend = styled.legend`
  font-weight: var(--weight-bold);
  padding-left: 0;
  padding-right: 0;
`;

const RadioButtonLabel = styled(Label)`
  font-weight: var(--weight-regular);
  margin-bottom: 0;
  margin-top: var(--size-8);
  position: relative;
`;

const RadioButtonInput = styled.input.attrs({
  type: 'radio',
})`
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const RadioButtonIcon = styled(CheckedRadioButtonIcon)`
  margin-right: var(--size-8);
`;

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
        <Label htmlFor="codename">
          Codename
          <Input
            id="codename"
            value={this.form.codename}
            onChange={this.form.setValue}
          />
        </Label>
        <Fieldset>
          <Legend>Type</Legend>
          <RadioButtonLabel htmlFor="datalogger">
            <RadioButtonInput
              id="datalogger"
              checked={this.form.type === 'Datalogger'}
              name="type"
              disabled
            />
            <RadioButtonIcon aria-hidden />
            Datalogger
          </RadioButtonLabel>
        </Fieldset>
        <Label htmlFor="serialNumber">
          Serial Number
          <Input
            id="serialNumber"
            value={this.form.serialNumber}
            onChange={this.form.setValue}
          />
        </Label>
        <Label htmlFor="imei">
          IMEI
          <Input
            id="imei"
            value={this.form.imei}
            onChange={this.form.setValue}
          />
        </Label>
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

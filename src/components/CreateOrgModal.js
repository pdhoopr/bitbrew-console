import { navigate } from '@reach/router';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import FormStore from '../stores/FormStore';
import { orgsPath } from '../utils/urls';
import { Input, Label } from './Forms';
import ModalForm from './ModalForm';

class CreateOrgModal extends React.Component {
  form = FormStore
    // prettier-ignore
    .props({
      name: '',
    })
    .create();

  tryToCreateOrg = async event => {
    event.preventDefault();
    await this.props.createOrg(this.form.serialized);
    this.props.signOut();
    navigate(orgsPath);
  };

  render() {
    const { close } = this.props;
    return (
      <ModalForm
        close={close}
        title="New Organization"
        buttonText="Create"
        submit={this.tryToCreateOrg}
      >
        <Label htmlFor="name">
          Name
          <Input
            id="name"
            value={this.form.name}
            onChange={this.form.setValue}
          />
        </Label>
      </ModalForm>
    );
  }
}

CreateOrgModal.propTypes = {
  close: PropTypes.func.isRequired,
  createOrg: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default observer(CreateOrgModal);

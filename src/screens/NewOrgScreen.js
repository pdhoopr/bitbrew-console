import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label } from '../components/Forms';
import ModalForm from '../components/ModalForm';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';
import { orgsPath } from '../utils/urls';

class NewOrgScreen extends React.Component {
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

NewOrgScreen.propTypes = {
  close: PropTypes.func.isRequired,
  createOrg: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(
  NewOrgScreen,
  ({ authStore, orgStore }) => ({
    createOrg: orgStore.createOrg,
    signOut: authStore.signOut,
  }),
);

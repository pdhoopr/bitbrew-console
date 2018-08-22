import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label } from '../components/Forms';
import ModalForm from '../components/ModalForm';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class NewOrgScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
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
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close } = this.props;
    return (
      <ModalForm
        title="New Organization"
        buttonText="Create"
        onSubmit={this.tryToCreateOrg}
        close={close}
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

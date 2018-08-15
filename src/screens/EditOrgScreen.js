import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label } from '../components/Forms';
import ModalForm from '../components/ModalForm';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class EditOrgScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormStore
    // prettier-ignore
    .props({
      name: this.props.org.name,
    })
    .create();

  tryToUpdateOrg = async event => {
    event.preventDefault();
    await this.props.updateOrg(this.props.org, this.form.serialized);
    this.props.close();
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close } = this.props;
    return (
      <ModalForm
        title="Edit Organization"
        buttonText="Save"
        onSubmit={this.tryToUpdateOrg}
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

EditOrgScreen.propTypes = {
  close: PropTypes.func.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateOrg: PropTypes.func.isRequired,
};

export default connect(
  EditOrgScreen,
  ({ orgStore }) => ({
    updateOrg: orgStore.updateOrg,
  }),
);

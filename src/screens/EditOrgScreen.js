import PropTypes from 'prop-types';
import React from 'react';
import ModalForm from '../components/ModalForm';
import OrgFields from '../components/OrgFields';
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

  tryToUpdateOrg = event => {
    event.preventDefault();
    this.props.errorBoundary(async () => {
      await this.props.updateOrg(this.props.org, this.form.serialized);
      this.props.close();
    });
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
        <OrgFields form={this.form} />
      </ModalForm>
    );
  }
}

EditOrgScreen.propTypes = {
  close: PropTypes.func.isRequired,
  errorBoundary: PropTypes.func.isRequired,
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateOrg: PropTypes.func.isRequired,
};

export default connect(
  EditOrgScreen,
  ({ orgStore, uiStore }) => ({
    errorBoundary: uiStore.errorBoundary,
    updateOrg: orgStore.updateOrg,
  }),
);

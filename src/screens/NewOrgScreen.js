import PropTypes from 'prop-types';
import React from 'react';
import ModalForm from '../components/ModalForm';
import OrgFields from '../components/OrgFields';
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

  tryToCreateOrg = event => {
    event.preventDefault();
    this.props.errorBoundary(async () => {
      const org = await this.props.createOrg(this.form.serialized);
      this.props.close();
      this.props.refreshTokenUntilHasOrg(org);
    });
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
        <OrgFields form={this.form} />
      </ModalForm>
    );
  }
}

NewOrgScreen.propTypes = {
  close: PropTypes.func.isRequired,
  createOrg: PropTypes.func.isRequired,
  errorBoundary: PropTypes.func.isRequired,
  refreshTokenUntilHasOrg: PropTypes.func.isRequired,
};

export default connect(
  NewOrgScreen,
  ({ orgStore, uiStore }) => ({
    createOrg: orgStore.createOrg,
    errorBoundary: uiStore.errorBoundary,
    refreshTokenUntilHasOrg: orgStore.refreshTokenUntilHasOrg,
  }),
);

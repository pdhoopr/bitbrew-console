import PropTypes from 'prop-types';
import React from 'react';
import FormState from '../../models/ui/FormState';
import { connect } from '../../utils/helpers';
import FormDrawer from '../ui/FormDrawer';
import OrgFormFields from './OrgFormFields';

class NewOrgForm extends React.Component {
  form = FormState.props({
    name: '',
  }).create();

  render() {
    const { createOrg, refreshTokenUntilHasOrg } = this.props;
    return (
      <FormDrawer
        title="New Organization"
        buttonText="Create"
        onSubmit={async () => {
          const org = await createOrg(this.form.serialized);
          refreshTokenUntilHasOrg(org);
        }}
      >
        <OrgFormFields form={this.form} />
      </FormDrawer>
    );
  }
}

NewOrgForm.propTypes = {
  createOrg: PropTypes.func.isRequired,
  refreshTokenUntilHasOrg: PropTypes.func.isRequired,
};

export default connect(
  NewOrgForm,
  ({ orgStore }) => ({
    createOrg: orgStore.createOrg,
    refreshTokenUntilHasOrg: orgStore.refreshTokenUntilHasOrg,
  }),
);

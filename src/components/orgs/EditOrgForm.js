import PropTypes from 'prop-types';
import React from 'react';
import FormState from '../../models/ui/FormState';
import { connect } from '../../utils/helpers';
import FormDrawer from '../ui/FormDrawer';
import OrgFormFields from './OrgFormFields';

class EditOrgForm extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormState.props({
    name: this.props.org.name,
  }).create();

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { org, updateOrg } = this.props;
    return (
      <FormDrawer
        title="Edit Organization"
        buttonText="Save"
        onSubmit={() => updateOrg(org, this.form.serialized)}
      >
        <OrgFormFields form={this.form} />
      </FormDrawer>
    );
  }
}

EditOrgForm.propTypes = {
  org: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateOrg: PropTypes.func.isRequired,
};

export default connect(
  EditOrgForm,
  ({ orgStore }) => ({
    updateOrg: orgStore.updateOrg,
  }),
);

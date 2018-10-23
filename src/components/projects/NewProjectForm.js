import PropTypes from 'prop-types';
import React from 'react';
import FormState from '../../models/ui/FormState';
import { connect } from '../../utils/helpers';
import FormDrawer from '../ui/FormDrawer';
import ProjectFormFields from './ProjectFormFields';

class NewProjectForm extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormState.props({
    orgId: this.props.org ? this.props.org.id : '',
    name: '',
    description: '',
    usesSimulatedDevices: false,
  }).create();

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { createProject, org, orgsAtoZ } = this.props;
    return (
      <FormDrawer
        title="New Project"
        buttonText="Create"
        onSubmit={() => createProject(this.form.serialized)}
      >
        <ProjectFormFields
          form={this.form}
          org={org}
          selectOrgFrom={orgsAtoZ}
        />
      </FormDrawer>
    );
  }
}

NewProjectForm.propTypes = {
  createProject: PropTypes.func.isRequired,
  org: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  orgsAtoZ: PropTypes.array.isRequired,
};

NewProjectForm.defaultProps = {
  org: null,
};

export default connect(
  NewProjectForm,
  ({ orgStore, projectStore }) => ({
    createProject: projectStore.createProject,
    orgsAtoZ: orgStore.orgsAtoZ,
  }),
);

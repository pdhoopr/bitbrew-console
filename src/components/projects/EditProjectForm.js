import PropTypes from 'prop-types';
import React from 'react';
import FormState from '../../models/ui/FormState';
import { connect } from '../../utils/helpers';
import FormDrawer from '../ui/FormDrawer';
import ProjectFormFields from './ProjectFormFields';

class EditProjectForm extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormState.props({
    orgId: this.props.project.org.id,
    name: this.props.project.name,
    description: this.props.project.description,
    usesSimulatedDevices: this.props.project.usesSimulatedDevices,
  }).create();

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { project, updateProject } = this.props;
    return (
      <FormDrawer
        title="Edit Project"
        buttonText="Save"
        onSubmit={() => updateProject(project, this.form.serialized)}
      >
        <ProjectFormFields form={this.form} org={project.org} />
      </FormDrawer>
    );
  }
}

EditProjectForm.propTypes = {
  project: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    org: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    usesSimulatedDevices: PropTypes.bool.isRequired,
  }).isRequired,
  updateProject: PropTypes.func.isRequired,
};

export default connect(
  EditProjectForm,
  ({ projectStore }) => ({
    updateProject: projectStore.updateProject,
  }),
);

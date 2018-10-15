import PropTypes from 'prop-types';
import React from 'react';
import ModalForm from '../components/ModalForm';
import ProjectFields from '../components/ProjectFields';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class EditProjectScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormStore
    // prettier-ignore
    .props({
      orgId: this.props.project.org.id,
      name: this.props.project.name,
      description: this.props.project.description,
      usesSimulatedDevices: this.props.project.usesSimulatedDevices,
    })
    .create();

  tryToUpdateProject = event => {
    event.preventDefault();
    this.props.errorBoundary(async () => {
      await this.props.updateProject(this.props.project, this.form.serialized);
      this.props.close();
    });
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close, project } = this.props;
    return (
      <ModalForm
        title="Edit Project"
        buttonText="Save"
        onSubmit={this.tryToUpdateProject}
        close={close}
      >
        <ProjectFields form={this.form} org={project.org} />
      </ModalForm>
    );
  }
}

EditProjectScreen.propTypes = {
  close: PropTypes.func.isRequired,
  errorBoundary: PropTypes.func.isRequired,
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
  EditProjectScreen,
  ({ projectStore, uiStore }) => ({
    errorBoundary: uiStore.errorBoundary,
    updateProject: projectStore.updateProject,
  }),
);

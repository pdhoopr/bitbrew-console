import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label, ReadOnlyInput } from '../components/Forms';
import ModalForm from '../components/ModalForm';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class EditProjectScreen extends React.Component {
  form = FormStore
    // prettier-ignore
    .props({
      orgId: this.props.project.org.id,
      name: this.props.project.name,
      description: this.props.project.description,
      usesSimulatedDevices: this.props.project.usesSimulatedDevices,
    })
    .create();

  tryToUpdateProject = async event => {
    event.preventDefault();
    await this.props.updateProject(this.props.project, this.form.serialized);
    this.props.close();
  };

  render() {
    const { close, project } = this.props;
    return (
      <ModalForm
        close={close}
        title="Edit Project"
        buttonText="Save"
        submit={this.tryToUpdateProject}
      >
        <Label htmlFor="orgId">
          Organization
          <ReadOnlyInput id="orgId" value={project.org.name} />
        </Label>
        <Label htmlFor="name">
          Name
          <Input
            id="name"
            value={this.form.name}
            onChange={this.form.setValue}
          />
        </Label>
        <Label htmlFor="description">
          Description
          <Input
            id="description"
            value={this.form.description}
            onChange={this.form.setValue}
          />
        </Label>
      </ModalForm>
    );
  }
}

EditProjectScreen.propTypes = {
  close: PropTypes.func.isRequired,
  project: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    org: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    usesSimulatedDevices: PropTypes.bool.isRequired,
  }).isRequired,
  updateProject: PropTypes.func.isRequired,
};

export default connect(
  EditProjectScreen,
  ({ projectStore }) => ({
    updateProject: projectStore.updateProject,
  }),
);

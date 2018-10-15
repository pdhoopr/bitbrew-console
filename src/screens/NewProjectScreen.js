import PropTypes from 'prop-types';
import React from 'react';
import ModalForm from '../components/ModalForm';
import ProjectFields from '../components/ProjectFields';
import FormStore from '../stores/FormStore';
import { connect } from '../utils/tools';

class NewProjectScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  form = FormStore
    // prettier-ignore
    .props({
      orgId: this.props.org ? this.props.org.id : '',
      name: '',
      description: '',
      usesSimulatedDevices: false,
    })
    .create();

  tryToCreateProject = event => {
    event.preventDefault();
    this.props.errorBoundary(async () => {
      await this.props.createProject(this.form.serialized);
      this.props.close();
    });
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close, org, orgsAtoZ } = this.props;
    return (
      <ModalForm
        title="New Project"
        buttonText="Create"
        onSubmit={this.tryToCreateProject}
        close={close}
      >
        <ProjectFields form={this.form} org={org} selectOrgFrom={orgsAtoZ} />
      </ModalForm>
    );
  }
}

NewProjectScreen.propTypes = {
  close: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  errorBoundary: PropTypes.func.isRequired,
  org: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  orgsAtoZ: PropTypes.array.isRequired,
};

NewProjectScreen.defaultProps = {
  org: null,
};

export default connect(
  NewProjectScreen,
  ({ orgStore, projectStore, uiStore }) => ({
    createProject: projectStore.createProject,
    errorBoundary: uiStore.errorBoundary,
    orgsAtoZ: orgStore.orgsAtoZ,
  }),
);

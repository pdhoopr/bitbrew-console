import PropTypes from 'prop-types';
import React from 'react';
import DeleteModal from '../components/DeleteModal';
import { connect } from '../utils/tools';

class DeleteProjectScreen extends React.Component {
  tryToDeleteProject = async () => {
    await this.props.deleteProject(this.props.project);
    this.props.close();
  };

  render() {
    const { close, project } = this.props;
    return (
      <DeleteModal
        title="Delete Project"
        onDelete={this.tryToDeleteProject}
        close={close}
      >
        Are you sure you want to delete the <strong>{project.name}</strong>{' '}
        project from the <strong>{project.org.name}</strong> organization? All
        devices and other data associated with this project will be permanently
        deleted.
      </DeleteModal>
    );
  }
}

DeleteProjectScreen.propTypes = {
  close: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    org: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(
  DeleteProjectScreen,
  ({ projectStore }) => ({
    deleteProject: projectStore.deleteProject,
  }),
);

import PropTypes from 'prop-types';
import React from 'react';
import DeleteModal from '../components/DeleteModal';
import Panel from '../components/Panel';
import { Text } from '../components/Texts';
import { connect } from '../utils/tools';

class DeleteProjectScreen extends React.Component {
  /* eslint-disable react/destructuring-assignment */
  tryToDeleteProject = async () => {
    await this.props.deleteProject(this.props.project);
    this.props.close();
  };

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { close, project } = this.props;
    return (
      <DeleteModal
        title="Delete Project"
        onDelete={this.tryToDeleteProject}
        close={close}
      >
        <Text>The following project will be permanently deleted:</Text>
        <Panel
          items={[
            ['Project', project.name],
            ['Organization', project.org.name],
          ]}
        />
        <Text>Are you sure you want to continue?</Text>
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

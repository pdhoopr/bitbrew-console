import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '../../utils/helpers';
import DeleteDialog from '../ui/DeleteDialog';
import Panel from '../ui/Panel';
import { Text } from '../ui/Texts';

function DeleteProjectDialog({ deleteProject, project }) {
  return (
    <DeleteDialog
      title="Delete Project"
      onDelete={() => deleteProject(project)}
    >
      <Text>The following project will be permanently deleted:</Text>
      <Panel
        items={[['Project', project.name], ['Organization', project.org.name]]}
      />
      <Text>Are you sure you want to continue?</Text>
    </DeleteDialog>
  );
}

DeleteProjectDialog.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    org: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(
  DeleteProjectDialog,
  ({ projectStore }) => ({
    deleteProject: projectStore.deleteProject,
  }),
);

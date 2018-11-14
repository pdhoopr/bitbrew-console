import PropTypes from "prop-types";
import React from "react";
import { deleteProject, listProjects } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";
import Panel from "../ui/Panel";
import { Text } from "../ui/Texts";

export default function DeleteProjectDialog({ onDelete, project }) {
  return (
    <DeleteDialog
      heading="Delete Project"
      onDelete={async () => {
        await deleteProject(project.id);
        await poll(async () => {
          const { items } = await listProjects(project.orgId);
          return items.every(item => item.id !== project.id);
        });
        await onDelete();
      }}
    >
      <Text>The following project will be permanently deleted:</Text>
      <Panel
        items={[["Project", project.name], ["Organization", project.orgName]]}
      />
      <Text>Are you sure you want to continue?</Text>
    </DeleteDialog>
  );
}

DeleteProjectDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
    orgName: PropTypes.string.isRequired,
  }).isRequired,
};

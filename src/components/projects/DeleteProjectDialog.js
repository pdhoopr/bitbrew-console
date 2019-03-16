import PropTypes from "prop-types";
import React from "react";
import { deleteProject, listProjects } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../shared/DeleteDialog";

export default function DeleteProjectDialog({ onDelete, project }) {
  return (
    <DeleteDialog
      resource={project}
      onConfirm={async () => {
        await deleteProject(project.id);
        await poll(async () => {
          const { items } = await listProjects(project.orgId);
          return items.every(item => item.id !== project.id);
        });
        await onDelete();
      }}
    />
  );
}

DeleteProjectDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
  }).isRequired,
};

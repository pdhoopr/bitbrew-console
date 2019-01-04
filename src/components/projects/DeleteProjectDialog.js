import PropTypes from "prop-types";
import React from "react";
import { deleteProject, listProjects } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";

export default function DeleteProjectDialog({ onDelete, project }) {
  const name = project.name.trim();
  const orgName = project.orgName ? project.orgName.trim() : null;
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
      Are you sure you want to delete {name ? "the" : "this"} project
      {name && <strong> {project.name}</strong>}
      {orgName && (
        <span>
          {" "}
          from the organization <strong>{orgName}</strong>
        </span>
      )}
      ?
    </DeleteDialog>
  );
}

DeleteProjectDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
    orgName: PropTypes.string,
  }).isRequired,
};

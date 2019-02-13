import PropTypes from "prop-types";
import React from "react";
import { deleteProject, listProjects } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";
import { Text } from "../ui/Texts";

export default function DeleteProjectDialog({ onDelete, project }) {
  const name = project.name.trim();
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
      Are you sure you want to delete the project{" "}
      <Text as="strong" gray={!name}>
        {name || "Unnamed project"}
      </Text>
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
  }).isRequired,
};

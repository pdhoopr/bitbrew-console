import PropTypes from "prop-types";
import React from "react";
import { deleteDestination, listDestinations } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";

export default function DeleteDestinationDialog({ destination, onDelete }) {
  return (
    <DeleteDialog
      heading="Delete Destination"
      onDelete={async () => {
        await deleteDestination(destination.id);
        await poll(async () => {
          const { items } = await listDestinations(destination.projectId);
          return items.every(item => item.id !== destination.id);
        });
        await onDelete();
      }}
    >
      Are you sure you want to delete the destination
      <strong> {destination.name}</strong>?
    </DeleteDialog>
  );
}

DeleteDestinationDialog.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

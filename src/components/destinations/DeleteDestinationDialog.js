import PropTypes from "prop-types";
import React from "react";
import { deleteDestination, listDestinations } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../shared/DeleteDialog";
import resourceTypes from "../shared/resourceTypes";

export default function DeleteDestinationDialog({ destination, onDelete }) {
  return (
    <DeleteDialog
      resource={{
        impl: resourceTypes.destination,
        ...destination,
      }}
      onConfirm={async () => {
        await deleteDestination(destination.id);
        await poll(async () => {
          const { items } = await listDestinations(destination.projectId);
          return items.every(item => item.id !== destination.id);
        });
        await onDelete();
      }}
    />
  );
}

DeleteDestinationDialog.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import { deleteDestination, listDestinations } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";
import Panel from "../ui/Panel";
import { Text } from "../ui/Texts";

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
      <Text>The following destination will be permanently deleted:</Text>
      <Panel
        items={[
          ["Destination", destination.name],
          ["Project", destination.projectName],
          ["Organization", destination.orgName],
        ]}
      />
      <Text>Are you sure you want to continue?</Text>
    </DeleteDialog>
  );
}

DeleteDestinationDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgName: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
  }).isRequired,
};

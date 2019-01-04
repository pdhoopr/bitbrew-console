import PropTypes from "prop-types";
import React from "react";
import { deleteOrg, listOrgs } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";

export default function DeleteOrgDialog({ onDelete, org }) {
  return (
    <DeleteDialog
      heading="Delete Organization"
      onDelete={async () => {
        await deleteOrg(org.id);
        await poll(async () => {
          const { items } = await listOrgs();
          return items.every(item => item.id !== org.id);
        });
        await onDelete();
      }}
    >
      Are you sure you want to delete the organization
      <strong> {org.name}</strong>?
    </DeleteDialog>
  );
}

DeleteOrgDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  org: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

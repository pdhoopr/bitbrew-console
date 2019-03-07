import PropTypes from "prop-types";
import React from "react";
import { deleteOrg, listOrgs } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../shared/DeleteDialog";
import resourceTypes from "../shared/resourceTypes";

export default function DeleteOrgDialog({ onDelete, org }) {
  return (
    <DeleteDialog
      resource={{
        impl: resourceTypes.org,
        ...org,
      }}
      onConfirm={async () => {
        await deleteOrg(org.id);
        await poll(async () => {
          const { items } = await listOrgs();
          return items.every(item => item.id !== org.id);
        });
        await onDelete();
      }}
    />
  );
}

DeleteOrgDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  org: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

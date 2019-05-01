import PropTypes from "prop-types";
import React, { useContext } from "react";
import { capitalize } from "../../utils";
import AppContext from "../AppContext";
import AlertDialog from "./AlertDialog";
import Name from "./Name";
import resourceTypes from "./resourceTypes";

export default function DeleteDialog({ children, onConfirm, resource }) {
  const { catchResourceErrors, closeDialog } = useContext(AppContext);

  return (
    <AlertDialog
      heading={`Delete ${capitalize(resource.impl)}`}
      closeAction="Cancel"
      onClose={closeDialog}
      confirmAction="Delete"
      onConfirm={() => {
        catchResourceErrors(resource.impl, async () => {
          await onConfirm();
          closeDialog();
          return { status: 204 };
        });
      }}
      infoLevel="warning"
    >
      Are you sure you want to delete the {resource.impl}{" "}
      <strong>
        <Name resource={resource} />
      </strong>
      ? {children}
    </AlertDialog>
  );
}

DeleteDialog.propTypes = {
  children: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    impl: PropTypes.oneOf(resourceTypes).isRequired,
  }).isRequired,
};

DeleteDialog.defaultProps = {
  children: null,
};

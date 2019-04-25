import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Snackbar } from "../../design-system";
import AppContext from "../AppContext";
import resourceTypes from "./resourceTypes";

export default function HttpSuccessSnackbar({ resourceType, statusCode }) {
  const { closeSnackbar } = useContext(AppContext);

  function getMessage() {
    switch (statusCode) {
      case 200:
        return `This ${resourceType} was updated successfully.`;
      case 201:
        return `The ${resourceType} was created successfully.`;
      case 204:
        return `The ${resourceType} was deleted successfully.`;
      default:
        return `The request was completed successfully.`;
    }
  }

  return (
    <Snackbar
      container={document.getElementById("status-region")}
      infoLevel="success"
      onClose={closeSnackbar}
    >
      {getMessage()}
    </Snackbar>
  );
}

HttpSuccessSnackbar.propTypes = {
  resourceType: PropTypes.oneOf(resourceTypes).isRequired,
  statusCode: PropTypes.number.isRequired,
};

import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Snackbar } from "../../design-system";
import AppContext from "../AppContext";
import resourceTypes from "./resourceTypes";

export default function HttpErrorSnackbar({ resourceType, statusCode }) {
  const { closeSnackbar } = useContext(AppContext);

  function getMessage() {
    switch (statusCode) {
      case 400:
        return "Bad request. Please fix and try again.";
      case 403:
        return "You don't have permission to do this.";
      case 404:
        return `This ${resourceType} could not be found.`;
      case 408:
        return "Things are taking longer than expected. Please try reloading the page.";
      case 409:
        return `This ${resourceType} already exists.`;
      case 422:
        return "Invalid input. Please modify and try again.";
      default:
        return "Sorry, something went wrong. Please try again.";
    }
  }

  return (
    <Snackbar
      container={document.getElementById("alert-region")}
      infoLevel="error"
      onClose={closeSnackbar}
    >
      {getMessage()}
    </Snackbar>
  );
}

HttpErrorSnackbar.propTypes = {
  resourceType: PropTypes.oneOf(resourceTypes).isRequired,
  statusCode: PropTypes.number.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import { capitalize } from "../../utils";
import FormDrawer from "./FormDrawer";
import resourceTypes from "./resourceTypes";

export default function UpdateForm({ children, onSubmit, resourceType }) {
  return (
    <FormDrawer
      closeTooltip={`Discard ${resourceType} changes`}
      heading={`Edit ${capitalize(resourceType)}`}
      action="Save"
      onSubmit={onSubmit}
    >
      {children}
    </FormDrawer>
  );
}

UpdateForm.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resourceType: PropTypes.oneOf(resourceTypes).isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import { capitalize } from "../../utils";
import FormDrawer from "./FormDrawer";
import resourceTypes from "./resourceTypes";

export default function CreateForm({ children, onSubmit, resourceType }) {
  return (
    <FormDrawer
      closeTooltip={`Cancel ${resourceType} creation`}
      heading={`New ${capitalize(resourceType)}`}
      action="Create"
      onSubmit={onSubmit}
    >
      {children}
    </FormDrawer>
  );
}

CreateForm.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resourceType: PropTypes.oneOf(resourceTypes).isRequired,
};

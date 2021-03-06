import PropTypes from "prop-types";
import React, { useContext } from "react";
import { capitalize } from "../../utils";
import AppContext from "../AppContext";
import FormDrawer from "./FormDrawer";
import resourceTypes from "./resourceTypes";

export default function UpdateForm({ children, onSubmit, resourceType }) {
  const { catchResourceErrors, closeDrawer } = useContext(AppContext);

  return (
    <FormDrawer
      heading={`Edit ${capitalize(resourceType)}`}
      onClose={closeDrawer}
      submitAction="Save"
      onSubmit={() => {
        catchResourceErrors(resourceType, async () => {
          await onSubmit();
          closeDrawer();
          return { status: 200 };
        });
      }}
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

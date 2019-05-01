import PropTypes from "prop-types";
import React, { useContext } from "react";
import { capitalize } from "../../utils";
import AppContext from "../AppContext";
import FormDrawer from "./FormDrawer";
import resourceTypes from "./resourceTypes";

export default function CreateForm({ children, onSubmit, resourceType }) {
  const { catchResourceErrors, closeDrawer } = useContext(AppContext);

  return (
    <FormDrawer
      heading={`New ${capitalize(resourceType)}`}
      onClose={closeDrawer}
      submitAction="Create"
      onSubmit={() => {
        catchResourceErrors(resourceType, async () => {
          await onSubmit();
          closeDrawer();
          return { status: 201 };
        });
      }}
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

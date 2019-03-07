import PropTypes from "prop-types";
import React from "react";
import { TextField } from "../../design-system";

export default function ProjectFormFields({ orgName, setValue, values }) {
  return (
    <>
      {orgName && (
        <TextField id="orgName" label="Organization" value={orgName} />
      )}
      <TextField
        id="name"
        label="Name"
        value={values.name}
        onChange={setValue}
        placeholder="Unnamed project"
      />
      <TextField
        id="description"
        label="Description"
        value={values.description}
        onChange={setValue}
      />
    </>
  );
}

ProjectFormFields.propTypes = {
  orgName: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
  }).isRequired,
};

ProjectFormFields.defaultProps = {
  orgName: null,
};

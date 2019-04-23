import PropTypes from "prop-types";
import React from "react";
import { TextField } from "../../design-system";

export default function ProjectFormFields({ onChange, orgName, values }) {
  return (
    <>
      {orgName && (
        <TextField label="Organization" id="orgName" value={orgName} />
      )}
      <TextField
        label="Name"
        id="name"
        value={values.name}
        placeholder="Unnamed project"
        onChange={onChange}
      />
      <TextField
        label="Description"
        id="description"
        value={values.description}
        onChange={onChange}
      />
    </>
  );
}

ProjectFormFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  orgName: PropTypes.string,
  values: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
  }).isRequired,
};

ProjectFormFields.defaultProps = {
  orgName: null,
};

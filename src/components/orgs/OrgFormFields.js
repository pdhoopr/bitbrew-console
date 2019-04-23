import PropTypes from "prop-types";
import React from "react";
import { TextField } from "../../design-system";

export default function OrgFormFields({ onChange, values }) {
  return (
    <TextField label="Name" id="name" value={values.name} onChange={onChange} />
  );
}

OrgFormFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

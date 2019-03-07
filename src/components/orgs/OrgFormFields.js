import PropTypes from "prop-types";
import React from "react";
import { TextField } from "../../design-system";

export default function OrgFormFields({ setValue, values }) {
  return (
    <TextField id="name" label="Name" value={values.name} onChange={setValue} />
  );
}

OrgFormFields.propTypes = {
  setValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

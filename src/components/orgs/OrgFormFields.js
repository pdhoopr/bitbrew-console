import PropTypes from "prop-types";
import React from "react";
import { Input, Label } from "../ui/Forms";

export default function OrgFormFields({ setValue, values }) {
  return (
    <Label htmlFor="name">
      Name
      <Input id="name" value={values.name} onChange={setValue} />
    </Label>
  );
}

OrgFormFields.propTypes = {
  setValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

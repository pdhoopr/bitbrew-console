import PropTypes from "prop-types";
import React from "react";
import { Input, Label, ReadOnlyInput } from "../ui/Forms";

export default function ProjectFormFields({ orgName, setValue, values }) {
  return (
    <React.Fragment>
      {orgName && (
        <Label htmlFor="orgName">
          Organization
          <ReadOnlyInput id="orgName" value={orgName} />
        </Label>
      )}
      <Label htmlFor="name">
        Name
        <Input
          id="name"
          value={values.name}
          onChange={setValue}
          placeholder="Unnamed project"
        />
      </Label>
      <Label htmlFor="description">
        Description
        <Input
          id="description"
          value={values.description}
          onChange={setValue}
        />
      </Label>
    </React.Fragment>
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

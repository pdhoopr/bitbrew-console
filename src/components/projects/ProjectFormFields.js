import PropTypes from "prop-types";
import React from "react";
import { Input, Label, ReadOnlyInput } from "../ui/Forms";
import Select from "../ui/Select";

export default function ProjectFormFields({
  org,
  selectOrgFrom,
  setValue,
  values,
}) {
  return (
    <React.Fragment>
      {(org || selectOrgFrom) && (
        <Label htmlFor="orgId">
          Organization
          {org ? (
            <ReadOnlyInput id="orgId" value={org} />
          ) : (
            <Select id="orgId" value={values.orgId} onChange={setValue}>
              {[...selectOrgFrom]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </Select>
          )}
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
  org: PropTypes.string,
  selectOrgFrom: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  setValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
  }).isRequired,
};

ProjectFormFields.defaultProps = {
  org: null,
  selectOrgFrom: null,
};

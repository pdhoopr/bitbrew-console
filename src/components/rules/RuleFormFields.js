import PropTypes from "prop-types";
import React from "react";
import {
  CheckboxField,
  MultilineTextField,
  SelectField,
  TextField,
} from "../../design-system";

export default function RuleFormFields({
  onChange,
  selectDestinationFrom,
  values,
}) {
  return (
    <>
      <TextField
        label="Name"
        id="name"
        value={values.name}
        placeholder="Unnamed rule"
        onChange={onChange}
      />
      <CheckboxField
        label="Enable"
        id="enabled"
        checked={values.enabled}
        onChange={onChange}
      />
      <MultilineTextField
        label="Trigger When"
        id="triggerRuleWhen"
        value={values.triggerRuleWhen}
        onChange={onChange}
        monospace
      />
      <MultilineTextField
        label="Data Transformation"
        id="dataTransformation"
        value={values.dataTransformation}
        onChange={onChange}
        monospace
      />
      <SelectField
        label="Destination"
        id="destinationId"
        value={values.destinationId}
        onChange={onChange}
      >
        {[...selectDestinationFrom]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </SelectField>
    </>
  );
}

RuleFormFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectDestinationFrom: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  values: PropTypes.shape({
    dataTransformation: PropTypes.string.isRequired,
    destinationId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    triggerRuleWhen: PropTypes.string.isRequired,
  }).isRequired,
};

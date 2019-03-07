import PropTypes from "prop-types";
import React from "react";
import { CheckboxField, SelectField, TextField } from "../../design-system";

export default function RuleFormFields({
  selectDestinationFrom,
  setValue,
  values,
}) {
  return (
    <>
      <TextField
        id="name"
        label="Name"
        value={values.name}
        onChange={setValue}
        placeholder="Unnamed rule"
      />
      <CheckboxField
        id="enabled"
        label="Enable"
        checked={values.enabled}
        onChange={setValue}
      />
      <TextField
        isMultiline
        id="triggerRuleWhen"
        label="Trigger When"
        value={values.triggerRuleWhen}
        onChange={setValue}
        monospace
      />
      <TextField
        isMultiline
        id="dataTransformation"
        label="Data Transformation"
        value={values.dataTransformation}
        onChange={setValue}
        monospace
      />
      <SelectField
        id="destinationId"
        label="Destination"
        value={values.destinationId}
        onChange={setValue}
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
  selectDestinationFrom: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    dataTransformation: PropTypes.string.isRequired,
    destinationId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    triggerRuleWhen: PropTypes.string.isRequired,
  }).isRequired,
};

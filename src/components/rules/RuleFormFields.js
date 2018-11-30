import PropTypes from "prop-types";
import React from "react";
import Checkbox from "../ui/Checkbox";
import { Choice, Input, Label, TextArea } from "../ui/Forms";
import Select from "../ui/Select";

export default function RuleFormFields({
  selectDestinationFrom,
  setValue,
  values,
}) {
  return (
    <React.Fragment>
      <Label htmlFor="name">
        Name
        <Input id="name" value={values.name} onChange={setValue} />
      </Label>
      <Choice htmlFor="enabled">
        <Checkbox id="enabled" checked={values.enabled} onChange={setValue} />
        Enable
      </Choice>
      <Label htmlFor="triggerRuleWhen">
        Trigger When
        <TextArea
          id="triggerRuleWhen"
          value={values.triggerRuleWhen}
          onChange={setValue}
          code
        />
      </Label>
      <Label htmlFor="dataTransformation">
        Data Transformation
        <TextArea
          id="dataTransformation"
          value={values.dataTransformation}
          onChange={setValue}
          code
        />
      </Label>
      <Label htmlFor="destinationId">
        Destination
        <Select
          id="destinationId"
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
        </Select>
      </Label>
    </React.Fragment>
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

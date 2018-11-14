import PropTypes from "prop-types";
import React from "react";
import { capitalize } from "../../utils";
import Checkbox from "../ui/Checkbox";
import { Choice, Fieldset, Input, Label, Legend } from "../ui/Forms";
import FormSection from "../ui/FormSection";
import RadioButton from "../ui/RadioButton";

export default function DeviceFormFields({ edit, setValue, values }) {
  const type = capitalize(values.type.trim());
  const isDatalogger = type.toUpperCase() === "DATALOGGER";
  return (
    <React.Fragment>
      <Label htmlFor="codename">
        Codename
        <Input id="codename" value={values.codename} onChange={setValue} />
      </Label>
      <Choice htmlFor="enabled">
        <Checkbox id="enabled" checked={values.enabled} onChange={setValue} />
        Enable
      </Choice>
      {!edit && (
        <Fieldset>
          <Legend>Type</Legend>
          <Choice htmlFor="datalogger">
            <RadioButton
              name="type"
              id="datalogger"
              checked={isDatalogger}
              onChange={setValue}
            />
            Datalogger
          </Choice>
        </Fieldset>
      )}
      {isDatalogger && (
        <FormSection heading={`${type} Settings`}>
          <Label htmlFor="serialNumber">
            Serial Number
            <Input
              id="serialNumber"
              value={values.serialNumber}
              onChange={setValue}
            />
          </Label>
          <Label htmlFor="imei">
            IMEI
            <Input id="imei" value={values.imei} onChange={setValue} />
          </Label>
        </FormSection>
      )}
    </React.Fragment>
  );
}

DeviceFormFields.propTypes = {
  edit: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    imei: PropTypes.string.isRequired,
    serialNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

DeviceFormFields.defaultProps = {
  edit: false,
};

import PropTypes from "prop-types";
import React from "react";
import {
  CheckboxField,
  FieldGroup,
  RadioField,
  RadioGroup,
  TextField,
} from "../../design-system";
import { capitalize } from "../../utils";

export default function DeviceFormFields({ setValue, showType, values }) {
  const isDatalogger = values.type.toUpperCase() === "DATALOGGER";
  return (
    <>
      <TextField
        id="codename"
        label="Codename"
        value={values.codename}
        onChange={setValue}
        placeholder="Unnamed device"
      />
      <CheckboxField
        id="enabled"
        label="Enable"
        checked={values.enabled}
        onChange={setValue}
      />
      {showType && (
        <RadioGroup heading="Type">
          <RadioField
            name="type"
            id="datalogger"
            label="Datalogger"
            checked={isDatalogger}
            onChange={setValue}
          />
        </RadioGroup>
      )}
      {isDatalogger && (
        <FieldGroup heading={`${capitalize(values.type)} Settings`}>
          <TextField
            id="serialNumber"
            label="Serial Number"
            value={values.serialNumber}
            onChange={setValue}
          />
          <TextField
            id="imei"
            label="IMEI"
            value={values.imei}
            onChange={setValue}
          />
        </FieldGroup>
      )}
    </>
  );
}

DeviceFormFields.propTypes = {
  setValue: PropTypes.func.isRequired,
  showType: PropTypes.bool,
  values: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    imei: PropTypes.string.isRequired,
    serialNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

DeviceFormFields.defaultProps = {
  showType: false,
};

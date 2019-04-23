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

export default function DeviceFormFields({ onChange, showType, values }) {
  const isDatalogger = values.type.toUpperCase() === "DATALOGGER";
  return (
    <>
      <TextField
        label="Codename"
        id="codename"
        value={values.codename}
        placeholder="Unnamed device"
        onChange={onChange}
      />
      <CheckboxField
        label="Enable"
        id="enabled"
        checked={values.enabled}
        onChange={onChange}
      />
      {showType && (
        <RadioGroup heading="Type">
          <RadioField
            label="Datalogger"
            name="type"
            id="datalogger"
            checked={isDatalogger}
            onChange={onChange}
          />
        </RadioGroup>
      )}
      {isDatalogger && (
        <FieldGroup heading={`${capitalize(values.type)} Settings`}>
          <TextField
            label="Serial Number"
            id="serialNumber"
            value={values.serialNumber}
            onChange={onChange}
          />
          <TextField
            label="IMEI"
            id="imei"
            value={values.imei}
            onChange={onChange}
          />
        </FieldGroup>
      )}
    </>
  );
}

DeviceFormFields.propTypes = {
  onChange: PropTypes.func.isRequired,
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

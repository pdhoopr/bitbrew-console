import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Input, Label } from "../ui/Forms";
import {
  CheckboxIcon,
  CheckboxSelectedIcon,
  RadioButtonSelectedIcon,
} from "../ui/Icons";

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const Legend = styled.legend`
  font-weight: var(--weight-bold);
  margin-bottom: var(--size-8);
  padding-left: 0;
  padding-right: 0;
`;

const ControlLabel = styled(Label)`
  display: inline-block;
  font-weight: var(--weight-regular);
  position: relative;

  ${/* sc-selector */ CheckboxIcon},
  ${/* sc-selector */ CheckboxSelectedIcon},
  ${/* sc-selector */ RadioButtonSelectedIcon} {
    margin-right: var(--size-8);
    vertical-align: -25%;
  }
`;

const ControlInput = styled.input`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  height: 100%;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export default function DeviceFormFields({ setValue, values }) {
  return (
    <React.Fragment>
      <Label htmlFor="codename">
        Codename
        <Input id="codename" value={values.codename} onChange={setValue} />
      </Label>
      <Fieldset>
        <Legend>Type</Legend>
        <ControlLabel htmlFor="datalogger">
          <ControlInput
            type="radio"
            id="datalogger"
            checked={values.type === "Datalogger"}
            name="type"
            disabled
          />
          <RadioButtonSelectedIcon aria-hidden />
          Datalogger
        </ControlLabel>
      </Fieldset>
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
      <ControlLabel htmlFor="enabled">
        <ControlInput
          type="checkbox"
          id="enabled"
          checked={values.enabled}
          onChange={setValue}
        />
        {values.enabled ? (
          <CheckboxSelectedIcon aria-hidden />
        ) : (
          <CheckboxIcon aria-hidden />
        )}
        Enabled
      </ControlLabel>
    </React.Fragment>
  );
}

DeviceFormFields.propTypes = {
  setValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    imei: PropTypes.string.isRequired,
    serialNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

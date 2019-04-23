import PropTypes from "prop-types";
import React from "react";
import {
  CheckboxField,
  ExpansionPanel,
  FieldGroup,
  MultilineTextField,
  RadioField,
  RadioGroup,
  TextField,
} from "../../design-system";
import { capitalize } from "../../utils";

export default function DestinationFormFields({ onChange, showType, values }) {
  const compareType = values.type.toUpperCase();
  const isAmqp = compareType === "AMQP";
  const isKeen = compareType === "KEEN";
  return (
    <>
      <TextField
        label="Name"
        id="name"
        value={values.name}
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
            label="AMQP"
            name="type"
            id="amqp"
            checked={isAmqp}
            onChange={onChange}
          />
          <RadioField
            label="Keen"
            name="type"
            id="keen"
            checked={isKeen}
            onChange={onChange}
          />
        </RadioGroup>
      )}
      {(isAmqp || isKeen) && (
        <FieldGroup heading={`${capitalize(values.type)} Settings`}>
          {isAmqp && (
            <>
              <TextField
                label="Username"
                id="amqpUser"
                value={values.amqpUser}
                onChange={onChange}
              />
              <TextField
                label="Password"
                id="amqpPassword"
                value={values.amqpPassword}
                onChange={onChange}
              />
              <TextField
                label="Host"
                id="amqpHost"
                value={values.amqpHost}
                onChange={onChange}
              />
              <TextField
                label="Virtual Host"
                id="amqpVhost"
                value={values.amqpVhost}
                onChange={onChange}
              />
              <CheckboxField
                label="Use TLS"
                id="amqpSecure"
                checked={values.amqpSecure}
                onChange={onChange}
              />
              <ExpansionPanel heading="Advanced">
                <TextField
                  label="Port"
                  id="amqpPort"
                  value={values.amqpPort}
                  placeholder={values.amqpSecure ? "5671" : "5672"}
                  onChange={onChange}
                />
                <TextField
                  label="Routing Key"
                  id="amqpDefaultRoutingKey"
                  value={values.amqpDefaultRoutingKey}
                  onChange={onChange}
                />
                <TextField
                  label="Query String"
                  id="amqpQuery"
                  value={values.amqpQuery}
                  onChange={onChange}
                />
              </ExpansionPanel>
            </>
          )}
          {isKeen && (
            <>
              <TextField
                label="Project ID"
                id="keenProjectId"
                value={values.keenProjectId}
                onChange={onChange}
              />
              <MultilineTextField
                label="Write Key"
                id="keenWriteKey"
                value={values.keenWriteKey}
                onChange={onChange}
              />
              <TextField
                label="Event Collection"
                id="keenStreamName"
                value={values.keenStreamName}
                onChange={onChange}
              />
            </>
          )}
        </FieldGroup>
      )}
    </>
  );
}

DestinationFormFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  showType: PropTypes.bool,
  values: PropTypes.shape({
    amqpDefaultRoutingKey: PropTypes.string.isRequired,
    amqpHost: PropTypes.string.isRequired,
    amqpPassword: PropTypes.string.isRequired,
    amqpPort: PropTypes.string.isRequired,
    amqpQuery: PropTypes.string.isRequired,
    amqpSecure: PropTypes.bool.isRequired,
    amqpUser: PropTypes.string.isRequired,
    amqpVhost: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    keenProjectId: PropTypes.string.isRequired,
    keenStreamName: PropTypes.string.isRequired,
    keenWriteKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

DestinationFormFields.defaultProps = {
  showType: false,
};

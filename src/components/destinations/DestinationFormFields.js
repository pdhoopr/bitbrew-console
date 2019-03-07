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

export default function DestinationFormFields({ setValue, showType, values }) {
  const compareType = values.type.toUpperCase();
  const isAmqp = compareType === "AMQP";
  const isKeen = compareType === "KEEN";
  return (
    <>
      <TextField
        id="name"
        label="Name"
        value={values.name}
        onChange={setValue}
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
            id="amqp"
            label="AMQP"
            checked={isAmqp}
            onChange={setValue}
          />
          <RadioField
            name="type"
            id="keen"
            label="Keen"
            checked={isKeen}
            onChange={setValue}
          />
        </RadioGroup>
      )}
      {(isAmqp || isKeen) && (
        <FieldGroup heading={`${capitalize(values.type)} Settings`}>
          {isAmqp && (
            <>
              <TextField
                id="amqpUser"
                label="Username"
                value={values.amqpUser}
                onChange={setValue}
              />
              <TextField
                id="amqpPassword"
                label="Password"
                value={values.amqpPassword}
                onChange={setValue}
              />
              <TextField
                id="amqpHost"
                label="Host"
                value={values.amqpHost}
                onChange={setValue}
              />
              <TextField
                id="amqpVhost"
                label="Virtual Host"
                value={values.amqpVhost}
                onChange={setValue}
              />
              <CheckboxField
                id="amqpSecure"
                label="Use TLS"
                checked={values.amqpSecure}
                onChange={setValue}
              />
              <FieldGroup isAccordion heading="Advanced">
                <TextField
                  id="amqpPort"
                  label="Port"
                  value={values.amqpPort}
                  onChange={setValue}
                  placeholder={values.amqpSecure ? "5671" : "5672"}
                />
                <TextField
                  id="amqpDefaultRoutingKey"
                  label="Routing Key"
                  value={values.amqpDefaultRoutingKey}
                  onChange={setValue}
                />
                <TextField
                  id="amqpQuery"
                  label="Query String"
                  value={values.amqpQuery}
                  onChange={setValue}
                />
              </FieldGroup>
            </>
          )}
          {isKeen && (
            <>
              <TextField
                id="keenProjectId"
                label="Project ID"
                value={values.keenProjectId}
                onChange={setValue}
              />
              <TextField
                isMultiline
                id="keenWriteKey"
                label="Write Key"
                value={values.keenWriteKey}
                onChange={setValue}
              />
              <TextField
                id="keenStreamName"
                label="Event Collection"
                value={values.keenStreamName}
                onChange={setValue}
              />
            </>
          )}
        </FieldGroup>
      )}
    </>
  );
}

DestinationFormFields.propTypes = {
  setValue: PropTypes.func.isRequired,
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

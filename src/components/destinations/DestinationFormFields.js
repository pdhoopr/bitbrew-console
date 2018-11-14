import PropTypes from "prop-types";
import React from "react";
import { capitalize } from "../../utils";
import Accordion from "../ui/Accordion";
import Checkbox from "../ui/Checkbox";
import { Choice, Fieldset, Input, Label, Legend, TextArea } from "../ui/Forms";
import FormSection from "../ui/FormSection";
import RadioButton from "../ui/RadioButton";

export default function DestinationFormFields({ edit, setValue, values }) {
  const type = capitalize(values.type.trim());
  const isAmqp = type.toUpperCase() === "AMQP";
  const isKeen = type.toUpperCase() === "KEEN";
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
      {!edit && (
        <Fieldset>
          <Legend>Type</Legend>
          <Choice htmlFor="amqp">
            <RadioButton
              name="type"
              id="amqp"
              checked={isAmqp}
              onChange={setValue}
            />
            AMQP
          </Choice>
          <Choice htmlFor="keen">
            <RadioButton
              name="type"
              id="keen"
              checked={isKeen}
              onChange={setValue}
            />
            Keen
          </Choice>
        </Fieldset>
      )}
      {(isAmqp || isKeen) && (
        <FormSection heading={`${type} Settings`}>
          {isAmqp && (
            <React.Fragment>
              <Label htmlFor="amqpUser">
                Username
                <Input
                  id="amqpUser"
                  value={values.amqpUser}
                  onChange={setValue}
                />
              </Label>
              <Label htmlFor="amqpPassword">
                Password
                <Input
                  id="amqpPassword"
                  value={values.amqpPassword}
                  onChange={setValue}
                />
              </Label>
              <Label htmlFor="amqpHost">
                Host
                <Input
                  id="amqpHost"
                  value={values.amqpHost}
                  onChange={setValue}
                />
              </Label>
              <Label htmlFor="amqpVhost">
                Virtual Host
                <Input
                  id="amqpVhost"
                  value={values.amqpVhost}
                  onChange={setValue}
                />
              </Label>
              <Choice htmlFor="amqpSecure">
                <Checkbox
                  id="amqpSecure"
                  checked={values.amqpSecure}
                  onChange={setValue}
                />
                Use TLS
              </Choice>
              <Accordion heading="Advanced">
                <Label htmlFor="amqpPort">
                  Port
                  <Input
                    id="amqpPort"
                    value={values.amqpPort}
                    onChange={setValue}
                    placeholder={values.amqpSecure ? 5671 : 5672}
                  />
                </Label>
                <Label htmlFor="amqpDefaultRoutingKey">
                  Routing Key
                  <Input
                    id="amqpDefaultRoutingKey"
                    value={values.amqpDefaultRoutingKey}
                    onChange={setValue}
                  />
                </Label>
                <Label htmlFor="amqpQuery">
                  Query String
                  <Input
                    id="amqpQuery"
                    value={values.amqpQuery}
                    onChange={setValue}
                  />
                </Label>
              </Accordion>
            </React.Fragment>
          )}
          {isKeen && (
            <React.Fragment>
              <Label htmlFor="keenProjectId">
                Project ID
                <Input
                  id="keenProjectId"
                  value={values.keenProjectId}
                  onChange={setValue}
                />
              </Label>
              <Label htmlFor="keenWriteKey">
                Write Key
                <TextArea
                  id="keenWriteKey"
                  value={values.keenWriteKey}
                  onChange={setValue}
                  rows={7}
                />
              </Label>
              <Label htmlFor="keenStreamName">
                Event Collection
                <Input
                  id="keenStreamName"
                  value={values.keenStreamName}
                  onChange={setValue}
                />
              </Label>
            </React.Fragment>
          )}
        </FormSection>
      )}
    </React.Fragment>
  );
}

DestinationFormFields.propTypes = {
  edit: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
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
  edit: false,
};

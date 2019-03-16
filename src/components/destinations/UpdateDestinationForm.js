import PropTypes from "prop-types";
import React from "react";
import { listDestinations, updateDestination } from "../../api";
import { poll } from "../../utils";
import CreateOrUpdateForm from "../shared/CreateOrUpdateForm";
import { destinationType } from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import DestinationFormFields from "./DestinationFormFields";

export default function UpdateDestinationForm({ destination, onUpdate }) {
  const [values, setValue] = useForm({
    projectId: destination.projectId,
    name: destination.name,
    enabled: destination.enabled,
    type: destination.type,
    amqpUser: destination.amqpUser || "",
    amqpPassword: destination.amqpPassword || "",
    amqpVhost: destination.amqpVhost || "",
    amqpHost: destination.amqpHost || "",
    amqpSecure: destination.amqpSecure || false,
    amqpPort: String(destination.amqpPort) || "",
    amqpDefaultRoutingKey: destination.amqpDefaultRoutingKey || "",
    amqpQuery: destination.amqpQuery || "",
    keenProjectId: destination.keenProjectId || "",
    keenWriteKey: destination.keenWriteKey || "",
    keenStreamName: destination.keenStreamName || "",
  });

  return (
    <CreateOrUpdateForm
      isUpdate
      resourceType={destinationType}
      onSubmit={async () => {
        const defaultAmqpPort = values.amqpSecure ? 5671 : 5672;
        const data = await updateDestination(destination.id, {
          ...values,
          amqpPort: values.amqpPort ? Number(values.amqpPort) : defaultAmqpPort,
        });
        await poll(async () => {
          const { items } = await listDestinations(data.projectId);
          const found = items.find(item => item.id === data.id);
          return !found || found.updatedAt === data.updatedAt;
        });
        await onUpdate();
      }}
    >
      <DestinationFormFields values={values} setValue={setValue} />
    </CreateOrUpdateForm>
  );
}

UpdateDestinationForm.propTypes = {
  destination: PropTypes.shape({
    amqpDefaultRoutingKey: PropTypes.string,
    amqpHost: PropTypes.string,
    amqpPassword: PropTypes.string,
    amqpPort: PropTypes.number,
    amqpQuery: PropTypes.string,
    amqpSecure: PropTypes.bool,
    amqpUser: PropTypes.string,
    amqpVhost: PropTypes.string,
    enabled: PropTypes.bool.isRequired,
    keenProjectId: PropTypes.string,
    keenStreamName: PropTypes.string,
    keenWriteKey: PropTypes.string,
    name: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

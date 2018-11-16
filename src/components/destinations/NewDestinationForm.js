import PropTypes from "prop-types";
import React from "react";
import { createDestination, listDestinations } from "../../api";
import { poll } from "../../utils";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import DestinationFormFields from "./DestinationFormFields";

export default function NewDestinationForm({ onCreate, project }) {
  const [values, setValue] = useForm({
    projectId: project,
    name: "",
    enabled: true,
    type: "",
    amqpUser: "",
    amqpPassword: "",
    amqpVhost: "",
    amqpHost: "",
    amqpSecure: false,
    amqpPort: "",
    amqpDefaultRoutingKey: "",
    amqpQuery: "",
    keenProjectId: "",
    keenWriteKey: "",
    keenStreamName: "",
  });

  return (
    <FormDrawer
      heading="New Destination"
      buttonText="Create"
      onSubmit={async () => {
        const amqpPort = values.amqpPort.trim();
        const defaultAmqpPort = values.amqpSecure ? 5671 : 5672;
        const data = await createDestination({
          ...values,
          amqpPort: amqpPort ? Number(amqpPort) : defaultAmqpPort,
        });
        await poll(async () => {
          const { items } = await listDestinations(data.projectId);
          return items.some(item => item.id === data.id);
        });
        await onCreate();
      }}
    >
      <DestinationFormFields values={values} setValue={setValue} />
    </FormDrawer>
  );
}

NewDestinationForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
};

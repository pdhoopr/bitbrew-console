import PropTypes from "prop-types";
import React from "react";
import { createDestination, listDestinations } from "../../api";
import { poll } from "../../utils";
import CreateForm from "../shared/CreateForm";
import { destinationType } from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import DestinationFormFields from "./DestinationFormFields";

export default function CreateDestinationForm({ onCreate, projectId }) {
  const [values, setValue] = useForm({
    projectId,
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
    <CreateForm
      resourceType={destinationType}
      onSubmit={async () => {
        const defaultAmqpPort = values.amqpSecure ? 5671 : 5672;
        const data = await createDestination({
          ...values,
          amqpPort: values.amqpPort ? Number(values.amqpPort) : defaultAmqpPort,
        });
        await poll(async () => {
          const { items } = await listDestinations(data.projectId);
          return items.some(item => item.id === data.id);
        });
        await onCreate();
      }}
    >
      <DestinationFormFields showType values={values} onChange={setValue} />
    </CreateForm>
  );
}

CreateDestinationForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

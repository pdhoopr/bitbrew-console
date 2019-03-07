import PropTypes from "prop-types";
import React from "react";
import { createDestination, listDestinations } from "../../api";
import { poll } from "../../utils";
import CreateOrUpdateForm from "../shared/CreateOrUpdateForm";
import resourceTypes from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import DestinationFormFields from "./DestinationFormFields";

export default function CreateDestinationForm({ onCreate, project }) {
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
    <CreateOrUpdateForm
      resource={resourceTypes.destination}
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
      <DestinationFormFields showType values={values} setValue={setValue} />
    </CreateOrUpdateForm>
  );
}

CreateDestinationForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
};

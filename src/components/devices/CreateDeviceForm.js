import PropTypes from "prop-types";
import React from "react";
import { createDevice, listDevices } from "../../api";
import { poll } from "../../utils";
import CreateOrUpdateForm from "../shared/CreateOrUpdateForm";
import resourceTypes from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import DeviceFormFields from "./DeviceFormFields";

export default function CreateDeviceForm({ onCreate, project }) {
  const [values, setValue] = useForm({
    projectId: project,
    codename: "",
    enabled: true,
    type: "datalogger",
    serialNumber: "",
    imei: "",
  });

  return (
    <CreateOrUpdateForm
      resource={resourceTypes.device}
      onSubmit={async () => {
        const data = await createDevice(values);
        await poll(async () => {
          const { items } = await listDevices(data.projectId);
          return items.some(item => item.id === data.id);
        });
        await onCreate();
      }}
    >
      <DeviceFormFields showType values={values} setValue={setValue} />
    </CreateOrUpdateForm>
  );
}

CreateDeviceForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
};

import PropTypes from "prop-types";
import React from "react";
import { createDevice, listDevices } from "../../api";
import { poll } from "../../utils";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import DeviceFormFields from "./DeviceFormFields";

export default function NewDeviceForm({ onCreate, project }) {
  const [values, setValue] = useForm({
    projectId: project,
    codename: "",
    enabled: true,
    type: "datalogger",
    serialNumber: "",
    imei: "",
  });

  return (
    <FormDrawer
      heading="New Device"
      buttonText="Create"
      onSubmit={async () => {
        const data = await createDevice(values);
        await poll(async () => {
          const { items } = await listDevices(data.projectId);
          return items.some(item => item.id === data.id);
        });
        await onCreate();
      }}
    >
      <DeviceFormFields values={values} setValue={setValue} />
    </FormDrawer>
  );
}

NewDeviceForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
};

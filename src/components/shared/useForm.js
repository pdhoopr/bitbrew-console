import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function mergeValue(key, value) {
    setValues(previousValues => ({
      ...previousValues,
      [key]: value,
    }));
  }

  function changeValue(event) {
    const { checked, id, name, type, value } = event.currentTarget;
    if (type === "checkbox") {
      mergeValue(id, checked);
    } else if (type === "radio") {
      mergeValue(name, id);
    } else {
      mergeValue(id, value);
    }
  }

  return [values, changeValue];
}

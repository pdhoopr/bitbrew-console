import { useState } from "react";

export default function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function changeValue(event) {
    const { checked, id, type, value } = event.currentTarget;
    setValues(prevValues => ({
      ...prevValues,
      [id]: type === "checkbox" ? checked : value,
    }));
  }

  return [values, changeValue];
}

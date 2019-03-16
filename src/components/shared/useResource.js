import { useState } from "react";

export default function useResource(resourceType, initialValue) {
  function addImpl(value) {
    const impl = resourceType;
    return Array.isArray(value)
      ? value.map(item => ({ ...item, impl }))
      : { ...value, impl };
  }

  const [resource, setResource] = useState(addImpl(initialValue));

  function setWithImpl(value) {
    setResource(addImpl(value));
  }

  return [resource, setWithImpl];
}

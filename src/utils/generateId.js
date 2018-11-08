import uniqid from "uniqid";

export default function generateId(prefix) {
  const id = `bb-${uniqid()}`;
  return process.env.NODE_ENV === "development" ? `${prefix}-${id}` : id;
}

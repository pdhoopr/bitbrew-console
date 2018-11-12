export default function capitalize(string) {
  const upper = string.toUpperCase();
  return upper === "AMQP"
    ? upper
    : string.replace(/^[a-z]/, letter => letter.toUpperCase());
}

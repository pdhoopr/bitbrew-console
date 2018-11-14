export default function capitalize(string) {
  const upperCase = string.toUpperCase();
  return upperCase === "AMQP"
    ? upperCase
    : string.toLowerCase().replace(/^[a-z]/, letter => letter.toUpperCase());
}

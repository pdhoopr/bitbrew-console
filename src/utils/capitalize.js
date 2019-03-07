const specialCases = {
  AMQP: "AMQP",
};

export default function capitalize(string) {
  return string
    .split(/\s+/)
    .map(
      word =>
        specialCases[word.toUpperCase()] ||
        word.toLowerCase().replace(/^[a-z]/, letter => letter.toUpperCase()),
    )
    .join(" ");
}

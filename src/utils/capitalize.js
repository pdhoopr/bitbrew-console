export default function capitalize(string) {
  return string.replace(/^[a-z]/, letter => letter.toUpperCase());
}

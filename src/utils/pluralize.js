export default function pluralize(string, count) {
  const phrase = `${count} ${string}`;
  return count === 1 ? phrase : `${phrase}s`;
}

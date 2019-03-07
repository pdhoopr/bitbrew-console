export default function pluralize(string, count) {
  const phrase = count === 1 ? string : `${string}s`;
  return count == null ? phrase : `${count} ${phrase}`;
}

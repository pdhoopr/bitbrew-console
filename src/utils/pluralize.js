export default function pluralize(word, count) {
  return `${count} ${word}${count !== 1 ? 's' : ''}`;
}

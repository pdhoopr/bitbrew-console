export default function formatDate(dateString) {
  const date = new Date(dateString);
  const locale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;
  const format = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return date.toLocaleString(locale, format);
}

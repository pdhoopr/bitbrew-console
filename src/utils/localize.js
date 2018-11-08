export default function localize(dateString) {
  const locale =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage;
  return new Date(dateString).toLocaleString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

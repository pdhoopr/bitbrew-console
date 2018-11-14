export default function localize(dateString, { time = false } = {}) {
  const locale =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage;
  const dateOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateString).toLocaleString(
    locale,
    time ? { ...dateOptions, ...timeOptions } : dateOptions,
  );
}

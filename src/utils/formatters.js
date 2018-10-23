export function capitalize(string) {
  return string.replace(/^[a-z]/, letter => letter.toUpperCase());
}

export function localize(dateString) {
  const locale =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage;
  return new Date(dateString).toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function pluralize(word, count) {
  const phrase = `${count} ${word}`;
  return count === 1 ? phrase : `${phrase}s`;
}

export function summarize(error) {
  // eslint-disable-next-line no-console
  console.error(error);
  const status = error.response && error.response.status;
  switch (status) {
    case 400:
      return 'Bad request. Please fix and try again.';
    case 403:
      return "You don't have permission to do this.";
    case 404:
      return 'This resource could not be found.';
    case 409:
      return 'This resource already exists.';
    case 422:
      return 'Invalid input. Please modify and try again.';
    default:
      return "Sorry, something's wrong. Please try again.";
  }
}

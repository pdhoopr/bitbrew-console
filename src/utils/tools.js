import { inject, observer } from 'mobx-react';

export function connect(Component, mapStoreToProps) {
  return inject(({ store }) => mapStoreToProps(store))(observer(Component));
}

export function flatMap(list, mapItemToArray) {
  return list.reduce((arr, item) => [...arr, ...mapItemToArray(item)], []);
}

export function localizeDate(dateString) {
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

export function matchesDate(value) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
}

export function matchesUuid(value) {
  return /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(value);
}

export function pluralize(word, count) {
  return `${count} ${word}${count !== 1 ? 's' : ''}`;
}

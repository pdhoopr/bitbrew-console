import { inject, observer } from 'mobx-react';
import uniqid from 'uniqid';

export function connect(Component, mapStoresToProps) {
  return inject(({ stores }) => mapStoresToProps(stores))(observer(Component));
}

export function createIdForA11y(displayName) {
  const id = `a11y-${uniqid()}`;
  return process.env.NODE_ENV === 'development' ? `${displayName}-${id}` : id;
}

export function localizeDate(dateString) {
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

export function matchesDate(value) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z$/.test(value);
}

export function matchesUuid(value) {
  return /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(value);
}

export function nextTick() {
  return Promise.resolve();
}

export function pluralize(word, count) {
  const phrase = `${count} ${word}`;
  return count === 1 ? phrase : `${phrase}s`;
}

export function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

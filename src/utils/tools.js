import { inject, observer } from 'mobx-react';
import Loadable from 'react-loadable';
import uniqid from 'uniqid';

export function connect(Component, mapStoreToProps) {
  return inject(({ store }) => mapStoreToProps(store))(observer(Component));
}

export function createIdForA11y(displayName) {
  const prefix = process.env.NODE_ENV === 'production' ? 'a11y' : displayName;
  return `${prefix}-${uniqid()}`;
}

export function loadAsync(loader) {
  return Loadable({
    loader,
    loading: () => null,
  });
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
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
}

export function matchesUuid(value) {
  return /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(value);
}

export function nextTick() {
  return Promise.resolve();
}

export function pluralize(word, count) {
  const suffix = count !== 1 ? 's' : '';
  return `${count} ${word}${suffix}`;
}

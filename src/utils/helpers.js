import { inject, observer } from 'mobx-react';
import uniqid from 'uniqid';

export function connect(Component, mapStoresToProps) {
  return inject(({ stores }) => mapStoresToProps(stores))(observer(Component));
}

export function createIdForA11y(displayName) {
  const id = `a11y-${uniqid()}`;
  return process.env.NODE_ENV === 'development' ? `${displayName}-${id}` : id;
}

export function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

import { inject, observer } from 'mobx-react';

export default function connect(Component, mapStoreToProps) {
  return inject(context => mapStoreToProps(context.store))(observer(Component));
}

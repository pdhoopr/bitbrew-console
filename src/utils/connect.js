import { inject, observer } from 'mobx-react';

export default function connect(Component, getPropsFromStore) {
  return inject(({ store }) => getPropsFromStore(store))(observer(Component));
}

import { inject, observer } from 'mobx-react';

export default (Component, getPropsFromStore) =>
  inject(({ store }) => getPropsFromStore(store))(observer(Component));

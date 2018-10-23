import { types } from 'mobx-state-tree';

export default types
  .model('UiStore')
  .volatile(() => ({
    isLoading: false,
    banner: null,
    dialog: null,
    drawer: null,
  }))
  .actions(self => ({
    setLoading(isLoading) {
      self.isLoading = isLoading;
    },
    openBanner(banner) {
      self.banner = banner;
    },
    closeBanner() {
      self.banner = null;
    },
    openDialog(dialog) {
      self.dialog = dialog;
    },
    closeDialog() {
      self.dialog = null;
    },
    openDrawer(drawer) {
      self.drawer = drawer;
    },
    closeDrawer() {
      self.drawer = null;
    },
  }));

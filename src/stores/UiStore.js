import { flow, types } from 'mobx-state-tree';

export default types
  .model('UiStore', {
    isLoading: types.optional(types.boolean, false),
    isOpen: types.optional(types.boolean, false),
    errorMessage: types.maybeNull(types.string),
  })
  .views(self => ({
    get isClosed() {
      return !self.isOpen;
    },
  }))
  .actions(self => ({
    setLoading(isLoading) {
      self.isLoading = isLoading;
    },
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    },
    setErrorMessage(errorMessage) {
      self.errorMessage = errorMessage;
    },
    clearErrorMessage() {
      self.errorMessage = null;
    },
    errorBoundary: flow(function* errorBoundary(fn) {
      try {
        yield Promise.resolve(fn());
      } catch (error) {
        const status = error.response && error.response.status;
        switch (status) {
          case 400:
            self.setErrorMessage('Bad request. Please fix and try again.');
            break;
          case 403:
            self.setErrorMessage("You don't have permission to do this.");
            break;
          case 404:
            self.setErrorMessage('This resource could not be found.');
            break;
          case 409:
            self.setErrorMessage('This resource already exists.');
            break;
          case 422:
            self.setErrorMessage('Invalid input. Please modify and try again.');
            break;
          default:
            self.setErrorMessage("Sorry, something's wrong. Please try again.");
            break;
        }
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }),
  }));

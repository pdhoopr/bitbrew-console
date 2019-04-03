export default function summarize(error) {
  // eslint-disable-next-line no-console
  console.error(error);
  const status = error.response && error.response.status;
  switch (status) {
    case 400:
      return "Bad request. Please fix and try again.";
    case 403:
      return "You don't have permission to do this.";
    case 404:
      return "This resource could not be found.";
    case 408:
      return "Things are taking longer than expected. Please try reloading the app.";
    case 409:
      return "This resource already exists.";
    case 422:
      return "Invalid input. Please modify and try again.";
    default:
      return "Sorry, something went wrong. Please try again.";
  }
}

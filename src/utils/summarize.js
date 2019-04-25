export default function summarize(response = {}, resourceType = "resource") {
  switch (response.status) {
    case 200:
      return `This ${resourceType} was updated successfully.`;
    case 201:
      return `The ${resourceType} was created successfully.`;
    case 204:
      return `The ${resourceType} was deleted successfully.`;
    case 400:
      return "Bad request. Please fix and try again.";
    case 403:
      return "You don't have permission to do this.";
    case 404:
      return `This ${resourceType} could not be found.`;
    case 408:
      return "Things are taking longer than expected. Please try reloading the page.";
    case 409:
      return `This ${resourceType} already exists.`;
    case 422:
      return "Invalid input. Please modify and try again.";
    default:
      return "Sorry, something went wrong. Please try again.";
  }
}

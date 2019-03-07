import resourceTypes from "./resourceTypes";

function getParentType(type) {
  switch (type) {
    case resourceTypes.org:
      return null;
    case resourceTypes.orgMember:
    case resourceTypes.project:
      return resourceTypes.org;
    default:
      return resourceTypes.project;
  }
}

const parentResourceTypes = Object.values(resourceTypes).reduce(
  (parentTypes, type) => ({
    ...parentTypes,
    [type]: getParentType(type),
  }),
  {},
);

Object.freeze(parentResourceTypes);

export default parentResourceTypes;

export default function getNavLinkProps({
  isCurrent,
  isPartiallyActive,
  isPartiallyCurrent,
}) {
  if (isCurrent) {
    return {
      "data-active": "",
      "data-current": "",
    };
  }
  if (isPartiallyCurrent && isPartiallyActive) {
    return {
      "data-active": "",
    };
  }
  return null;
}

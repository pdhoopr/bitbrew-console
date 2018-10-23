export function isDate(value) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z$/.test(value);
}

export function isRelativeLink(value) {
  return /^\/(?!\/)/.test(value);
}

export function isUuid(value) {
  return /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(value);
}

const eventListeners = {
  error: new Map(),
  request: new Map(),
  response: new Map(),
};

Object.freeze(eventListeners);

export default eventListeners;

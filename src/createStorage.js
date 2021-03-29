const createStorage = (provider, { parseReviver } = {}) => ({
  get(key, defaultValue) {
    const json = provider.getItem(key);
    // eslint-disable-next-line no-nested-ternary
    return json === null || typeof json === 'undefined'
      ? typeof defaultValue === 'function'
        ? defaultValue()
        : defaultValue
      : JSON.parse(json, parseReviver);
  },
  set(key, value) {
    provider.setItem(key, JSON.stringify(value));
  },
});

export default createStorage;

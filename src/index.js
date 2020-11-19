import { useState } from 'react';

import usePersistedState from './usePersistedState';
import createStorage from './createStorage';

const getProvider = () => {
  if (typeof global !== 'undefined' && global.localStorage) {
    return global.localStorage;
  }
  // eslint-disable-next-line no-undef
  if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
    // eslint-disable-next-line no-undef
    return globalThis.localStorage;
  }
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return null;
};

const createPersistedState = (key, provider = getProvider()) => {
  if (provider) {
    const storage = createStorage(provider);
    return (initialState) => usePersistedState(initialState, key, storage);
  }
  return useState;
};

export default createPersistedState;

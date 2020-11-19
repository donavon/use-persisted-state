import { useState } from 'react';

import usePersistedState from './usePersistedState';
import createStorage from './createStorage';

const getProvider = () => {
	if(typeof global !== 'undefined') return global.localStorage
	if(typeof globalThis !== 'undefined') return globalThis.localStorage
	if(typeof window !== 'undefined') return window.localStorage
	if(typeof localStorage !== 'undefined') return localStorage
	return null
}

const createPersistedState = (
  key,
  provider = getProvider()
) => {
  if (provider) {
    const storage = createStorage(provider);
    return initialState => usePersistedState(initialState, key, storage);
  }
  return useState;
};

export default createPersistedState;

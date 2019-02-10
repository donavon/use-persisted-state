import { useState } from 'react';
import usePersistedState from './usePersistedState';

const createPersistedState = (
  key,
  provider = global.localStorage
) => (
  provider
    ? initialState => usePersistedState(initialState, key, provider)
    : useState
);

export default createPersistedState;

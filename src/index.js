import {
  useState, useEffect, useCallback, useRef,
} from 'react';

import createGlobalState from './createGlobalState';

const createStorage = provider => ({
  get(key, defaultValue) {
    const json = provider.getItem(key);
    // eslint-disable-next-line no-nested-ternary
    return json === null
      ? typeof defaultValue === 'function'
        ? defaultValue()
        : defaultValue
      : JSON.parse(json);
  },
  set(key, value) {
    provider.setItem(key, JSON.stringify(value));
  },
});

const createPersistedState = (key, provider = global.localStorage) => (initialState) => {
  const globalState = useRef(null);
  const createStorageMemoized = useCallback(() => createStorage(provider), [
    provider,
  ]);
  const { get, set } = createStorageMemoized();

  const [state, setState] = useState(() => get(key, initialState));

  // only called on mount/unmount
  useEffect(
    () => {
      // Listen for `localStorage` changes from other windows
      const onStorage = ({ key: k, newValue }) => {
        const newState = JSON.parse(newValue);
        if (k === key && state !== newState) {
          setState(newState);
        }
      };
      global.addEventListener('storage', onStorage);

      // register a listener that calls `setState` when another instance emits
      globalState.current = createGlobalState(key, setState, state);

      return () => {
        global.removeEventListener('storage', onStorage);
        globalState.current.deregister();
      };
    },
    [key, provider]
  );

  // Only persist to storage if state changes.
  useEffect(
    () => {
      // persist to localStorage
      set(key, state);

      // inform all of the other instances in this tab
      globalState.current.emit(state);
    },
    [state]
  );

  return [state, setState];
};

export default createPersistedState;

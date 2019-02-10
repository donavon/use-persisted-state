import {
  useState, useEffect, useCallback, useRef,
} from 'react';

import createGlobalState from './createGlobalState';
import useEventListener from './useEventListener';
import createStorage from './createStorage';

const usePersistedState = (initialState, key, provider) => {
  const globalState = useRef(null);
  const createStorageMemoized = useCallback(() => createStorage(provider), [provider]);
  const { get, set } = createStorageMemoized();

  const [state, setState] = useState(() => get(key, initialState));

  // subscribe to `storage` change events
  useEventListener('storage', ({ key: k, newValue }) => {
    const newState = JSON.parse(newValue);
    if (k === key && state !== newState) {
      setState(newState);
    }
  });

  // only called on mount
  useEffect(() => {
    // register a listener that calls `setState` when another instance emits
    globalState.current = createGlobalState(key, setState, initialState);

    return () => {
      globalState.current.deregister();
    };
  }, []);

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

export default usePersistedState;

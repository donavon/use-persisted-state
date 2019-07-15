import { useState, useEffect, useRef } from 'react';
import useEventListener from '@use-it/event-listener';

import createGlobalState from './createGlobalState';

const usePersistedState = (initialState, key, { get, set }) => {
  const globalState = useRef(null);
  const [state, setState] = useState(() => get(key, initialState));

  // subscribe to `storage` change events
  useEventListener('storage', ({ key: k, newValue }) => {
    if (k === key) {
      const newState = JSON.parse(newValue);
      if (state !== newState) {
        setState(newState);
      }
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

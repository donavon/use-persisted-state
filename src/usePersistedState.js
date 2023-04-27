import { useState, useEffect, useRef, useCallback } from 'react';
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
  }, [initialState, key]);

  const persistentSetState = useCallback(
    (newState) => {
      // persist to localStorage, set state, then inform all of the other instances in this tab
      if (typeof newState === 'function') {
        setState((prevState) => {
          const newStateValue = newState(prevState);
          set(key, newStateValue);
          globalState.current.emit(newStateValue);
          return newStateValue;
        });
      } else {
        set(key, newState);
        setState(newState);
        globalState.current.emit(newState);
      }
    },
    [state, set, key]
  );

  return [state, persistentSetState];
};

export default usePersistedState;

import { useState, useEffect, useRef, useCallback } from 'react';
import useEventListener from '@use-it/event-listener';

import createGlobalState from './createGlobalState';

const getNewStateValue = (nextValue, state) =>
  typeof nextValue === 'function' ? nextValue(state) : nextValue;

const usePersistedState = (initialState, reducer, key, { get, set }) => {
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
    (nextValue) => {
      const newStateValue = reducer
        ? reducer(state, nextValue)
        : getNewStateValue(nextValue, state);

      // persist to localStorage
      set(key, newStateValue);

      setState(newStateValue);

      // inform all of the other instances in this tab
      globalState.current.emit(nextValue);
    },
    [state, set, key, reducer]
  );

  return [state, persistentSetState];
};

export default usePersistedState;

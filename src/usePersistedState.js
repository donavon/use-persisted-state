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

  const persistentSetState = useCallback(newState => {
    const newStateValue =
      typeof newState === 'function' ? newState(state) : newState;    
    
    // persist to localStorage
    set(key, newState);
    
    setState(newStateValue);

    // inform all of the other instances in this tab
    globalState.current.emit(newState);

  }, [state, set, key]);

  return [state, persistentSetState];
};

export default usePersistedState;

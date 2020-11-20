declare module 'use-persisted-state' {
  function createPersistedState<T>(key: string, storage: Storage): (initialState: T) => [S, Dispatch<SetStateAction<S>>];
  export = createPersistedState;
}

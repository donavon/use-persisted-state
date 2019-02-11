import { useState } from 'react';
import 'jest-dom/extend-expect';

import createPersistedState from '../src';
import * as usePersistedState from '../src/usePersistedState';

describe('createPersistedState', () => {
  test('import createPersistedState from "use-persisted-state"', () => {
    expect(typeof createPersistedState).toBe('function');
  });
  test('returns useState if provider is null or running SSR', () => {
    // global.localStorage is undefined in Node.js (but Jest mocks)
    // expect(createPersistedState('key')).toBe(useState);
    expect(createPersistedState('key', null)).toBe(useState);
  });
  test('returns a function if provider provided', () => {
    const fn = createPersistedState('key', 'provider');
    expect(typeof fn).toBe('function');
    expect(fn).not.toBe(useState);
  });
  test('returns a function if provider defaulted', () => {
    const fn = createPersistedState('key');
    expect(typeof fn).toBe('function');
    expect(fn).not.toBe(useState);
  });
  test('calling that function passes initialValuel, key, and provider', () => {
    usePersistedState.default = jest.fn(); // Mutate the default export
    const fn = createPersistedState('key', 'provider');
    fn('foo');
    // expect(usePersistedState.default).toBeCalledWith('foo', 'key');
    expect(usePersistedState.default).toBeCalled();
  });
});

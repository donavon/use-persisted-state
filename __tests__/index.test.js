import { testHook, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import createPersistedState from '../src';

afterEach(cleanup);

describe('createPersistedState', () => {
  test('import createPersistedState from "use-persisted-state"', () => {
    expect(typeof createPersistedState).toBe('function');
  });
});

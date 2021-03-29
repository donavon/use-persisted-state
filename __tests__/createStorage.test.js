import 'jest-dom/extend-expect';

import createStorage from '../src/createStorage';

const mockStorage = {
  getItem: (key) => (key === null ? null : JSON.stringify(key)),
  setItem: () => {},
};
class Provider {
  constructor() {
    this.storage = {};
  }

  getItem(key) {
    return this.storage[key];
  }

  setItem(key, value) {
    this.storage[key] = value;
  }
}

describe('createStorage', () => {
  test('returns a Storage object with a get method', () => {
    const spy = jest.spyOn(mockStorage, 'getItem');
    const { get } = createStorage(mockStorage);

    expect(typeof get).toBe('function');

    expect(get('foo')).toBe('foo');
    expect(spy).toBeCalledWith('foo');

    expect(get(null, 'foo')).toBe('foo');
    expect(get(null, () => 'foo')).toBe('foo');

    spy.mockRestore();
  });
  test('returns a Storage object with a set method', () => {
    const spy = jest.spyOn(mockStorage, 'setItem');
    const { set } = createStorage(mockStorage);

    expect(typeof set).toBe('function');

    set('key', 'foo');
    expect(spy).toBeCalledWith('key', '"foo"');

    spy.mockRestore();
  });

  describe('Provider', () => {
    test('return a Storage object of type string', () => {
      const mockProvider = new Provider();
      const { get, set } = createStorage(mockProvider);
      set('key', 'foo');
      expect(get('key')).toBe('foo');
    });

    test('return a Storage object of type null', () => {
      const mockProvider = new Provider();
      const { get, set } = createStorage(mockProvider);
      set('key', null);
      expect(get('key')).toBe(null);
    });

    test('return a Storage object of type undefined', () => {
      const mockProvider = new Provider();
      const { get, set } = createStorage(mockProvider);
      set('key', undefined);
      expect(get('key')).toBe(undefined);
    });
  });

  describe('parseReviver', () => {
    test('format specific values by key', () => {
      const mockProvider = new Provider();
      const { get, set } = createStorage(mockProvider, {
        parseReviver: (key, value) => (key === 'Alice' ? value * 2 : value),
      });

      set('people', {
        Ben: 41,
        Alice: 24,
      });
      expect(get('people')).toEqual({
        Ben: 41,
        Alice: 48,
      });
    });

    test('format to Date from string', () => {
      const mockProvider = new Provider();
      const { get, set } = createStorage(mockProvider, {
        parseReviver: (_key, value) => new Date(value),
      });

      set('today', new Date(2019, 12, 31));
      expect(get('today')).toBeInstanceOf(Date);
      expect(get('today')).toEqual(new Date(2019, 12, 31));
    });
  });
});

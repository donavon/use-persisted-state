import 'jest-dom/extend-expect';

import createStorage from '../src/createStorage';

const mockStorage = {
  getItem: key => (key === null ? null : JSON.stringify(key)),
  setItem: () => {},
};

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
});

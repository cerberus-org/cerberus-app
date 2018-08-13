import { getIndex, getItemWithoutArrayProperties } from './model.helpers';

describe('model helpers', () => {

  it('should get index of item', () => {
    const arr = [{ id: '1', value: 'a' }, { id: '2', value: 'b' }, { id: '3', value: 'c' }];
    expect(getIndex(arr, '2')).toEqual(1);
  });

  it('should not get index of item if id does not exist', () => {
    const arr = [{ id: '1', value: 'a' }, { id: '2', value: 'b' }, { id: '3', value: 'c' }];
    expect(getIndex(arr, '22')).toEqual(undefined);
  });

  it('should remove values of type array from an object', () => {
    expect(getItemWithoutArrayProperties({ a: 'test', b: ['a', 'b'] })).toEqual({ a: 'test' });
  });
});

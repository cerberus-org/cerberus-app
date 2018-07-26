import { titleCase, upperAllFirst } from './capitalize.helpers';

describe('upperAllFirst()', () => {
  it('should capitalize a single word', () => {
    expect(upperAllFirst('one')).toEqual('One');
  });

  it('should capitalize multiple words', () => {
    expect(upperAllFirst('one two')).toEqual('One Two');
  });

  it('should capitalize multiple hyphenated words', () => {
    expect(upperAllFirst('one-two')).toEqual('One-Two');
  });

  it('should capitalize multiple hyphenated words with more than one hyphen', () => {
    expect(upperAllFirst('one-two-three')).toEqual('One-Two-Three');
  });

  it('should capitalize multiple sets of hyphenated words', () => {
    expect(upperAllFirst('one-two three-four')).toEqual('One-Two Three-Four');
  });

  it('should not set non-first letters to lowercase', () => {
    expect(upperAllFirst('ONE TWO-THREE')).toEqual('ONE TWO-THREE');
  });
});

describe('titleCase()', () => {
  it('should capitalize a hyphenated String', () => {
    expect(titleCase('one-two')).toEqual('One-Two');
  });

  it('should capitalize a single word', () => {
    expect(titleCase('one')).toEqual('One');
  });

  it('should capitalize a string with multiple words', () => {
    expect(titleCase('one two')).toEqual('One Two');
  });

  it('should capitalize multiple hyphenated words with more than one hyphen', () => {
    expect(titleCase('one-two-three')).toEqual('One-Two-Three');
  });

  it('should capitalize multiple sets of hyphenated words', () => {
    expect(titleCase('one-two three-four')).toEqual('One-Two Three-Four');
  });

  it('should set subsequent letters to lowercase', () => {
    expect(titleCase('ONE TWO-THREE')).toEqual('One Two-Three');
  });

  it('should capitalize first letters and sets subsequent letters to lowercase', () => {
    expect(titleCase('oNE tWO-tHREE')).toEqual('One Two-Three');
  });
});

import { titleCase, upperAllFirst } from './capitalize.functions';

describe('upperAllFirst()', () => {
  it('capitalizes a single word', () => {
    expect(upperAllFirst('one')).toEqual('One');
  });

  it('capitalizes multiple words', () => {
    expect(upperAllFirst('one two')).toEqual('One Two');
  });

  it('capitalizes multiple hyphenated words', () => {
    expect(upperAllFirst('one-two')).toEqual('One-Two');
  });

  it('capitalizes multiple hyphenated words with more than one hyphen', () => {
    expect(upperAllFirst('one-two-three')).toEqual('One-Two-Three');
  });

  it('capitalizes multiple sets of hyphenated words', () => {
    expect(upperAllFirst('one-two three-four')).toEqual('One-Two Three-Four');
  });

  it('does not set non-first letters to lowercase', () => {
    expect(upperAllFirst('ONE TWO-THREE')).toEqual('ONE TWO-THREE');
  });
});

describe('titleCase()', () => {
  it('capitalizes a hyphenated String', () => {
    expect(titleCase('one-two')).toEqual('One-Two');
  });

  it('capitalizes a single word', () => {
    expect(titleCase('one')).toEqual('One');
  });

  it('capitalizes a string with multiple words', () => {
    expect(titleCase('one two')).toEqual('One Two');
  });

  it('capitalizes multiple hyphenated words with more than one hyphen', () => {
    expect(titleCase('one-two-three')).toEqual('One-Two-Three');
  });

  it('capitalizes multiple sets of hyphenated words', () => {
    expect(titleCase('one-two three-four')).toEqual('One-Two Three-Four');
  });

  it('sets subsequent letters to lowercase', () => {
    expect(titleCase('ONE TWO-THREE')).toEqual('One Two-Three');
  });

  it('capitalizes first letters and sets subsequent letters to lowercase', () => {
    expect(titleCase('oNE tWO-tHREE')).toEqual('One Two-Three');
  });
});

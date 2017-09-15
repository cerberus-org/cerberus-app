import { capitalize, capitalizeWithNameCase } from './capitalize';

describe('capitalize()', () => {

  it('capitalizes a single word', done => {
    expect(capitalize('one')).toEqual('One');
    done();
  });

  it('capitalizes multiple words', done => {
    expect(capitalize('one two')).toEqual('One Two');
    done();
  });

  it('capitalizes multiple hyphenated words', done => {
    expect(capitalize('one-two')).toEqual('One-Two');
    done();
  });

  it('capitalizes multiple hyphenated words with more than one hyphen', done => {
    expect(capitalize('one-two-three')).toEqual('One-Two-Three');
    done();
  });

  it('capitalizes multiple sets of hyphenated words', done => {
    expect(capitalize('one-two three-four')).toEqual('One-Two Three-Four');
    done();
  });

  it('does not set non-first letters to lowercase', done => {
    expect(capitalize('ONE TWO-THREE')).toEqual('ONE TWO-THREE');
    done();
  });
});

describe('capitalizeWithNameCase()', () => {

  it('capitalizes a hyphenated String', done => {
    expect(capitalizeWithNameCase('one-two')).toEqual('One-Two');
    done();
  });

  it('capitalizes a single word', done => {
    expect(capitalizeWithNameCase('one')).toEqual('One');
    done();
  });

  it('capitalizes a string with multiple words', done => {
    expect(capitalizeWithNameCase('one two')).toEqual('One Two');
    done();
  });

  it('capitalizes multiple hyphenated words with more than one hyphen', done => {
    expect(capitalizeWithNameCase('one-two-three')).toEqual('One-Two-Three');
    done();
  });

  it('capitalizes multiple sets of hyphenated words', done => {
    expect(capitalizeWithNameCase('one-two three-four')).toEqual('One-Two Three-Four');
    done();
  });

  it('sets subsequent letters to lowercase', done => {
    expect(capitalizeWithNameCase('ONE TWO-THREE')).toEqual('One Two-Three');
    done();
  });

  it('capitalizes first letters and sets subsequent letters to lowercase', done => {
    expect(capitalizeWithNameCase('oNE tWO-tHREE')).toEqual('One Two-Three');
    done();
  });
});

import { titleCase, upperAllFirst } from './capitalize';

describe('upperAllFirst()', () => {

  it('capitalizes a single word', done => {
    expect(upperAllFirst('one')).toEqual('One');
    done();
  });

  it('capitalizes multiple words', done => {
    expect(upperAllFirst('one two')).toEqual('One Two');
    done();
  });

  it('capitalizes multiple hyphenated words', done => {
    expect(upperAllFirst('one-two')).toEqual('One-Two');
    done();
  });

  it('capitalizes multiple hyphenated words with more than one hyphen', done => {
    expect(upperAllFirst('one-two-three')).toEqual('One-Two-Three');
    done();
  });

  it('capitalizes multiple sets of hyphenated words', done => {
    expect(upperAllFirst('one-two three-four')).toEqual('One-Two Three-Four');
    done();
  });

  it('does not set non-first letters to lowercase', done => {
    expect(upperAllFirst('ONE TWO-THREE')).toEqual('ONE TWO-THREE');
    done();
  });
});

describe('titleCase()', () => {

  it('capitalizes a hyphenated String', done => {
    expect(titleCase('one-two')).toEqual('One-Two');
    done();
  });

  it('capitalizes a single word', done => {
    expect(titleCase('one')).toEqual('One');
    done();
  });

  it('capitalizes a string with multiple words', done => {
    expect(titleCase('one two')).toEqual('One Two');
    done();
  });

  it('capitalizes multiple hyphenated words with more than one hyphen', done => {
    expect(titleCase('one-two-three')).toEqual('One-Two-Three');
    done();
  });

  it('capitalizes multiple sets of hyphenated words', done => {
    expect(titleCase('one-two three-four')).toEqual('One-Two Three-Four');
    done();
  });

  it('sets subsequent letters to lowercase', done => {
    expect(titleCase('ONE TWO-THREE')).toEqual('One Two-Three');
    done();
  });

  it('capitalizes first letters and sets subsequent letters to lowercase', done => {
    expect(titleCase('oNE tWO-tHREE')).toEqual('One Two-Three');
    done();
  });
});

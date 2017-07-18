import Volunteer from './volunteer';

const model = new Volunteer;

describe(typeof Volunteer, () => {
  it('capitalizes hyphenated word', done => {
    expect(model.capitalize('one-two')).toEqual('One-Two');
    done();
  });
  it('capitalizes word with multiple hyphens', done => {
    expect(model.capitalize('one-two-three')).toEqual('One-Two-Three');
    done();
  });
  it('capitalizes multiple hyphenated words', done => {
    expect(model.capitalize('one-two three-four')).toEqual('One-Two Three-Four');
    done();
  });
  it('capitalizes word and hyphenated word', done => {
    expect(model.capitalize('one two-three')).toEqual('One Two-Three');
    done();
  });
  it('capitalizes single word', done => {
    expect(model.capitalize('one')).toEqual('One');
    done();
  });
  it('capitalizes multiple words', done => {
    expect(model.capitalize('one two')).toEqual('One Two');
    done();
  });
});

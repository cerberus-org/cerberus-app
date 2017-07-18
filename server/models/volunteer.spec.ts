import Volunteer from './volunteer';

const model = new Volunteer;

describe(typeof Volunteer, () => {
  it('capitalizes hyphenated String', done => {
    expect(model.capitalize('one-two')).toEqual('One-Two');
    done();
  });
  it('capitalizes String with multiple hyphens', done => {
    expect(model.capitalize('one-two-three')).toEqual('One-Two-Three');
    done();
  });
  it('capitalizes String with multiple hyphenated words', done => {
    expect(model.capitalize('one-two three-four')).toEqual('One-Two Three-Four');
    done();
  });
  it('capitalizes uppercase String', done => {
    expect(model.capitalize('ONE TWO-THREE')).toEqual('One Two-Three');
    done();
  });
  it('capitalizes single String', done => {
    expect(model.capitalize('one')).toEqual('One');
    done();
  });
  it('capitalizes String with multiple words', done => {
    expect(model.capitalize('one two')).toEqual('One Two');
    done();
  });
});

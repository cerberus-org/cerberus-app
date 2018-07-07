import { BACK, Back, FORWARD, Forward, GO, Go } from './router.actions';

describe('router.actions', () => {
  it('should create a Go action', () => {
    const payload = { path: ['test/path'] };
    expect({ ...new Go(payload) }).toEqual({
      payload,
      type: GO,
    });
  });

  it('should create a Back action', () => {
    expect({ ...new Back() }).toEqual({
      type: BACK,
    });
  });

  it('should create a Forward action', () => {
    expect({ ...new Forward() }).toEqual({
      type: FORWARD,
    });
  });
});

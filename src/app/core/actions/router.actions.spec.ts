import { Back, Forward, Go, RouterActionTypes } from './router.actions';

describe('router.actions', () => {
  it('should create a Go action', () => {
    const payload = { path: ['test/path'] };
    expect({ ...new Go(payload) }).toEqual({
      payload,
      type: RouterActionTypes.Go,
    });
  });

  it('should create a Back action', () => {
    expect({ ...new Back() }).toEqual({
      type: RouterActionTypes.Back,
    });
  });

  it('should create a Forward action', () => {
    expect({ ...new Forward() }).toEqual({
      type: RouterActionTypes.Forward,
    });
  });
});

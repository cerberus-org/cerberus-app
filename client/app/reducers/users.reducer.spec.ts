import { testUsers, User } from '../models/user';
import * as fromUsers from './users.reducer'
import * as UserActions from '../actions/users.actions';

describe('userReducer', () => {
  let users: User[];

  beforeEach(() => {
    users = testUsers.slice(0);

  });

  it('loads users', () => {
    const result = fromUsers.reducer(fromUsers.initialState, new UserActions.Load(users)).users;
    expect(result).toBe(users);
  });

  it('adds a user', () => {
    const user = Object.assign({}, users[0]);
    const result = fromUsers.reducer(fromUsers.initialState, new UserActions.Add(user)).users;
    expect(result[0]).toBe(user);
    expect(result.length).toBe(users.length + 1);
  });

  it('modifies a user', () => {
    const modified = Object.assign({}, users[0]);
    const result = fromUsers.reducer(fromUsers.initialState, new UserActions.Modify(modified)).users;
    expect(result[0]).toBe(modified);
  });
});

import 'hammerjs';

import { userReducer } from './user.reducer';
import { testUsers, User } from '../models/user';

describe('userReducer', () => {
  let users: User[];

  beforeEach(() => {
    users = testUsers.slice(0);
  });

  it('loads users', () => {
    const result = userReducer([], { type: 'LOAD_USERS', payload: users }).users;
    expect(result).toBe(users);
  });

  it('adds a user', () => {
    const user = Object.assign({}, users[0]);
    const result = userReducer(users, { type: 'ADD_USER', payload: user }).users;
    expect(result[0]).toBe(user);
    expect(result.length).toBe(users.length + 1);
  });

  it('modifies a user', () => {
    const modified = Object.assign({}, users[0]);
    const result = userReducer(users, { type: 'MODIFY_USER', payload: modified }).users;
    expect(result[0]).toBe(modified);
  });
});

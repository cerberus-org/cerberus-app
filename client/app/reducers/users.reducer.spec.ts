import { testUsers, User } from '../models/user';
import * as fromUsers from './users.reducer'
import * as UserActions from '../actions/users.actions';

describe('userReducer', () => {
  let users: User[];

  beforeEach(() => {
    users = testUsers.slice(0);
  });

  describe('LOAD', () => {

    it('loads users', () => {
      const state = fromUsers.reducer({ users: users }, new UserActions.Load(users));
      expect(state.users).toBe(users);
    });
  });

  describe('ADD', () => {

    it('adds a user', () => {
      const user = Object.assign({}, users[0]);
      const state = fromUsers.reducer({ users: users }, new UserActions.Add(user));
      expect(state.users[0]).toBe(user);
      expect(state.users.length).toBe(users.length + 1);
    });
  });

  describe('MODIFY', () => {

    it('modifies a user', () => {
      const modified = Object.assign({}, users[0]);
      const state = fromUsers.reducer({ users: users }, new UserActions.Modify(modified));
      expect(state.users[0]).toBe(modified);
    });
  });
});

import * as AuthActions from '../actions/auth.actions';
import { testOrganizations, testUsers } from '../models';
import * as fromAuth from './auth.reducer';

describe('appReducer', () => {

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads the User and Organization', () => {
      const state = fromAuth.reducer(
        fromAuth.initialState,
        new AuthActions.LoadDataSuccess({ user: testUsers[0], organization: testOrganizations[0] }),
      );
      expect(state.user).toEqual(testUsers[0]);
      expect(state.organization).toEqual(testOrganizations[0]);
    });
  });

  describe('UPDATE_ORGANIZATION', () => {

    it('updates the organization', () => {
      const state = fromAuth.reducer(
        fromAuth.initialState,
        new AuthActions.UpdateOrganization(testOrganizations[0]),
      );
      expect(state.organization).toEqual(testOrganizations[0]);
    });
  });

  describe('UPDATE_USER', () => {

    it('updates the user', () => {
      const state = fromAuth.reducer(
        fromAuth.initialState,
        new AuthActions.UpdateUser(testUsers[0]),
      );
      expect(state.user).toEqual(testUsers[0]);
    });
  });
});

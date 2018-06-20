import { mockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers } from '../../../mock/objects/user.mock';
import * as AuthActions from '../actions/auth.actions';
import * as fromAuth from './auth.reducer';

describe('appReducer', () => {

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads the User and Organization', () => {
      const state = fromAuth.reducer(
        fromAuth.initialState,
        new AuthActions.LoadDataSuccess({ user: getMockUsers()[0], organization: mockOrganizations[0] }),
      );
      expect(state.user).toEqual(getMockUsers()[0]);
      expect(state.organization).toEqual(mockOrganizations[0]);
    });
  });

  describe('UPDATE_ORGANIZATION', () => {

    it('updates the organization', () => {
      const state = fromAuth.reducer(
        fromAuth.initialState,
        new AuthActions.UpdateOrganization(mockOrganizations[0]),
      );
      expect(state.organization).toEqual(mockOrganizations[0]);
    });
  });

  describe('UPDATE_USER', () => {

    it('updates the user', () => {
      const state = fromAuth.reducer(
        fromAuth.initialState,
        new AuthActions.UpdateUser(getMockUsers()[0]),
      );
      expect(state.user).toEqual(getMockUsers()[0]);
    });
  });
});

import { createMockMembers } from '../../../mock/objects/member.mock';
import { mockOrganizations } from '../../../mock/objects/organization.mock';
import * as SessionActions from '../actions/session.actions';
import { sessionReducer } from './session.reducer';

describe('layoutReducer', () => {

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads the Member and Organization', () => {
      const state = sessionReducer(
        undefined,
        new SessionActions.LoadDataSuccess({ member: createMockMembers()[0], organization: mockOrganizations[0] }),
      );
      expect(state.member).toEqual(createMockMembers()[0]);
      expect(state.organization).toEqual(mockOrganizations[0]);
    });
  });

  describe('SET_ORGANIZATION', () => {

    it('updates the validOrganization', () => {
      const state = sessionReducer(
        undefined,
        new SessionActions.SetOrganization(mockOrganizations[0]),
      );
      expect(state.organization).toEqual(mockOrganizations[0]);
    });
  });

  describe('SET_USER', () => {

    it('updates the validMember', () => {
      const state = sessionReducer(
        undefined,
        new SessionActions.SetUser(createMockMembers()[0]),
      );
      expect(state.member).toEqual(createMockMembers()[0]);
    });
  });
});

import { createMockMembers } from '../../../mock/objects/member.mock';
import { createMockOrganizations, mockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockUserInfo } from '../../../mock/objects/user.mock';
import * as SessionActions from '../actions/session.actions';
import { sessionReducer } from './session.reducer';
import objectContaining = jasmine.objectContaining;

describe('layoutReducer', () => {

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads the Member and Organization', () => {
      const state = sessionReducer(
        undefined,
        new SessionActions.LoadDataSuccess({
          member: createMockMembers()[0],
          organization: createMockOrganizations()[0],
          userInfo: createMockUserInfo()[0],
        }),
      );
      expect(state.member).toEqual(createMockMembers()[0]);
      expect(state.organization).toEqual(mockOrganizations[0]);
    });
  });

  describe('SET_ORGANIZATION', () => {

    it('sets the organization', () => {
      const state = sessionReducer(
        undefined,
        new SessionActions.SetOrganization(mockOrganizations[0]),
      );
      expect(state.organization).toEqual(mockOrganizations[0]);
    });
  });

  describe('SET_MEMBER_AND_USER_INFO', () => {

    it('sets the member', () => {
      const member = createMockMembers()[0];
      const userInfo = createMockUserInfo()[0];
      const state = sessionReducer(
        undefined,
        new SessionActions.SetMemberAndUserInfo({ member, userInfo }),
      );
      expect(state).toEqual(objectContaining({ member, userInfo }));
    });
  });
});

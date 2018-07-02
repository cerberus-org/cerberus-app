import { MEMBER_ROLE_ADMIN, MEMBER_ROLE_LOCKED, MEMBER_ROLE_MEMBER, MEMBER_ROLE_OWNER } from '../../../functions';
import { createMockMembers } from '../../../mock/objects/member.mock';
import { Member } from '../../../models';
import { selectMembersWithRoleOptions } from './roles.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe('RolesSelectors', () => {
  describe('selectMembersWithRoleOptions', () => {
    let members: Member[];

    beforeEach(() => {
      members = createMockMembers();
    });

    it('it should select members with role options based on session member', () => {
      expect(selectMembersWithRoleOptions.projector(members[0], members, 2))
        .toEqual(arrayContaining([
          objectContaining({
            ...members[0],
            roles: arrayContaining([
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
          objectContaining({
            ...members[1],
            roles: arrayContaining([
              MEMBER_ROLE_LOCKED,
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
          objectContaining({
            ...members[2],
            roles: arrayContaining([
              MEMBER_ROLE_LOCKED,
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
        ]));
    });

    it('it should select members without role options if session member is not an admin', () => {
      const members = createMockMembers();
      expect(selectMembersWithRoleOptions.projector(members[1], members, 2))
        .toEqual(arrayContaining([
          objectContaining({
            ...members[0],
            roles: null,
          }),
          objectContaining({
            ...members[1],
            roles: null,
          }),
          objectContaining({
            ...members[2],
            roles: null,
          }),
        ]));
    });

    it('it should not allow the last owner to change their role', () => {
      const members = createMockMembers();
      expect(selectMembersWithRoleOptions.projector(members[1], members, 1))
        .toEqual(arrayContaining([
          objectContaining({
            ...members[0],
            roles: null,
          }),
          objectContaining({
            ...members[1],
            roles: arrayContaining([
              MEMBER_ROLE_LOCKED,
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
          objectContaining({
            ...members[2],
            roles: arrayContaining([
              MEMBER_ROLE_LOCKED,
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
        ]));
    });
  });
});

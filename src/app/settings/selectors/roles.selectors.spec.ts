import { createMockMembers } from '../../../mocks/objects/member.mock';
import { MEMBER_ROLE_ADMIN, MEMBER_ROLE_LOCKED, MEMBER_ROLE_MEMBER, MEMBER_ROLE_OWNER } from '../../shared/helpers';
import { Member } from '../../shared/models';
import { getMembersWithRoleOptions } from './roles.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe('roles.selectors', () => {
  describe('getMembersWithRoleOptions', () => {
    let members: Member[];

    beforeEach(() => {
      members = createMockMembers();
    });

    it('it should select members with role options based on session member', () => {
      expect(getMembersWithRoleOptions.projector(members[0], members, 2))
        .toEqual(arrayContaining([
          objectContaining({
            ...members[0],
            roleOptions: arrayContaining([
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
          objectContaining({
            ...members[1],
            roleOptions: arrayContaining([
              MEMBER_ROLE_LOCKED,
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
          objectContaining({
            ...members[2],
            roleOptions: arrayContaining([
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
      expect(getMembersWithRoleOptions.projector(members[1], members, 2))
        .toEqual(arrayContaining([
          objectContaining({
            ...members[0],
            roleOptions: null,
          }),
          objectContaining({
            ...members[1],
            roleOptions: null,
          }),
          objectContaining({
            ...members[2],
            roleOptions: null,
          }),
        ]));
    });

    it('it should not allow the last owner to change their role', () => {
      const members = createMockMembers();
      expect(getMembersWithRoleOptions.projector(members[0], members, 1))
        .toEqual(arrayContaining([
          objectContaining({
            ...members[0],
            roleOptions: null,
          }),
          objectContaining({
            ...members[1],
            roleOptions: arrayContaining([
              MEMBER_ROLE_LOCKED,
              MEMBER_ROLE_MEMBER,
              MEMBER_ROLE_ADMIN,
              MEMBER_ROLE_OWNER,
            ]),
          }),
          objectContaining({
            ...members[2],
            roleOptions: arrayContaining([
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

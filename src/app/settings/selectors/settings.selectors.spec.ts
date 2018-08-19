import { createMockMembers } from '../../../mocks/objects/member.mock';
import { Member } from '../../shared/models';
import { Roles } from '../../shared/models/roles';
import { initialSettingsReducerState } from '../reducers/settings.reducer';
import { getMemberTableRows, getSelectedSettingsOption, getSettingsReducerState } from './settings.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe('settings.selectors', () => {
  describe('getSettingsReducerState', () => {
    it('it should select the state', () => {
      const state = initialSettingsReducerState;
      expect(getSettingsReducerState.projector({
        settings: state,
      }))
        .toEqual(state);
    });
  });

  describe('getSelectedSettingsOption', () => {
    it('it should select the sidenav selection', () => {
      const state = initialSettingsReducerState;
      expect(getSelectedSettingsOption.projector(state))
        .toEqual(state.selectedOption);
    });
  });

  describe('getMemberTableRows', () => {
    let members: Member[];

    beforeEach(() => {
      members = createMockMembers();
    });

    it('it should select members with role options based on session member', () => {
      expect(getMemberTableRows.projector(members[0], members, 2))
        .toEqual(arrayContaining([
          objectContaining({
            member: members[0],
            roleOptions: arrayContaining([
              Roles.Member,
              Roles.Admin,
              Roles.Owner,
            ]),
          }),
          objectContaining({
            member: members[1],
            roleOptions: arrayContaining([
              Roles.Locked,
              Roles.Member,
              Roles.Admin,
              Roles.Owner,
            ]),
          }),
          objectContaining({
            member: members[2],
            roleOptions: arrayContaining([
              Roles.Locked,
              Roles.Member,
              Roles.Admin,
              Roles.Owner,
            ]),
          }),
        ]));
    });

    it('it should select members without role options if session member is not an admin', () => {
      const members = createMockMembers();
      expect(getMemberTableRows.projector(members[1], members, 2))
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
      expect(getMemberTableRows.projector(members[0], members, 1))
        .toEqual(arrayContaining([
          objectContaining({
            member: members[0],
            roleOptions: null,
          }),
          objectContaining({
            member: members[1],
            roleOptions: arrayContaining([
              Roles.Locked,
              Roles.Member,
              Roles.Admin,
              Roles.Owner,
            ]),
          }),
          objectContaining({
            member: members[2],
            roleOptions: arrayContaining([
              Roles.Locked,
              Roles.Member,
              Roles.Admin,
              Roles.Owner,
            ]),
          }),
        ]));
    });
  });
});

import { USER_ROLES } from '../../../functions';
import { createMockColumnOptions } from '../../../mock/objects/column-options.mock';
import { createMockMembers } from '../../../mock/objects/member.mock';
import { selectRolesColumnOptions, selectRolesContainerState } from './roles.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe('RolesSelectors', () => {
  describe('selectRolesColumnOptions', () => {
    it('it should select column options for the Roles page', () => {
      const mockUsers = createMockMembers();
      expect(selectRolesColumnOptions.projector(mockUsers[0], mockUsers))
        .toEqual(arrayContaining([
          objectContaining({ columnDef: 'firstName', header: 'First Name' }),
          objectContaining({ columnDef: 'lastName', header: 'Last Name' }),
          objectContaining({ columnDef: 'role', header: 'Role' }),
        ]));
    });

    it('it should use the session member to determine role select options', () => {
      const mockUsers = createMockMembers();
      expect(selectRolesColumnOptions.projector(mockUsers[0], mockUsers)[2].selectOptions(mockUsers[1]))
        .toEqual(arrayContaining(USER_ROLES));
    });
  });

  describe('selectRolesContainerState', () => {
    it('it should select the Roles page state', () => {
      const mockUsers = createMockMembers();
      const mockColumnOptions = createMockColumnOptions();
      expect(selectRolesContainerState.projector(mockUsers, mockColumnOptions))
        .toEqual({
          users: mockUsers,
          columnOptions: mockColumnOptions,
        });
    });
  });
});

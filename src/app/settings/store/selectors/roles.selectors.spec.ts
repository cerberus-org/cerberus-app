import { USER_ROLES } from '../../../functions';
import { createMockColumnOptions } from '../../../mock/objects/column-options.mock';
import { createMockUsers } from '../../../mock/objects/user.mock';
import { selectRolesColumnOptions, selectRolesPageState } from './roles.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe('RolesSelectors', () => {
  describe('selectRolesColumnOptions', () => {
    it('it should select column options for the Roles page', () => {
      const mockUsers = createMockUsers();
      expect(selectRolesColumnOptions.projector(mockUsers[0], mockUsers))
        .toEqual(arrayContaining([
          objectContaining({ columnDef: 'firstName', header: 'First Name' }),
          objectContaining({ columnDef: 'lastName', header: 'Last Name' }),
          objectContaining({ columnDef: 'role', header: 'Role' }),
        ]));
    });

    it('it should use the session user to determine role select options', () => {
      const mockUsers = createMockUsers();
      expect(selectRolesColumnOptions.projector(mockUsers[0], mockUsers)[2].selectOptions(mockUsers[1]))
        .toEqual(arrayContaining(USER_ROLES));
    });
  });

  describe('selectRolesPageState', () => {
    it('it should select the Roles page state', () => {
      const mockUsers = createMockUsers();
      const mockColumnOptions = createMockColumnOptions();
      expect(selectRolesPageState.projector(mockUsers, mockColumnOptions))
        .toEqual({
          users: mockUsers,
          columnOptions: mockColumnOptions,
        });
    });
  });
});

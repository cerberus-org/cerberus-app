import { createSelector } from '@ngrx/store';
import { selectSessionUser } from '../../../auth/store/selectors/session.selectors';
import { canSelectRole, getRoleOptions, isLastOwner } from '../../../functions';
import { ColumnOptions, User } from '../../../models';
import { selectModelUsers } from '../../../root/store/selectors/model.selectors';

export const selectRolesColumnOptions = createSelector(
  selectSessionUser,
  selectModelUsers,
  (sessionUser: User, modelUsers: User[]): ColumnOptions[] => [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: User) => row.firstName,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: User) => row.lastName,
    ),
    new ColumnOptions(
      'role',
      'Role',
      (row: User) => row.role,
      (row: User) =>
        canSelectRole(sessionUser, row) && !isLastOwner(row, modelUsers)
          ? getRoleOptions(sessionUser, row)
          : null,
    ),
  ],
);

export interface RolesContainerState {
  users: User[];
  columnOptions: ColumnOptions[];
}

export const selectRolesContainerState = createSelector(
  selectModelUsers,
  selectRolesColumnOptions,
  (users: User[], columnOptions: ColumnOptions[]): RolesContainerState => ({ users, columnOptions }),
);

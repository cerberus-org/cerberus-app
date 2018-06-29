import { createSelector } from '@ngrx/store';
import { selectSessionMember } from '../../../auth/store/selectors/session.selectors';
import { canSelectRole, getRoleOptions, isLastOwner } from '../../../functions';
import { ColumnOptions, Member } from '../../../models';
import { selectModelUsers } from '../../../root/store/selectors/model.selectors';

export const selectRolesColumnOptions = createSelector(
  selectSessionMember,
  selectModelUsers,
  (sessionUser: Member, modelUsers: Member[]): ColumnOptions[] => [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: Member) => row.firstName,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: Member) => row.lastName,
    ),
    new ColumnOptions(
      'role',
      'Role',
      (row: Member) => row.role,
      (row: Member) =>
        canSelectRole(sessionUser, row) && !isLastOwner(row, modelUsers)
          ? getRoleOptions(sessionUser, row)
          : null,
    ),
  ],
);

export interface RolesContainerState {
  members: Member[];
  columnOptions: ColumnOptions[];
}

export const selectRolesContainerState = createSelector(
  selectModelUsers,
  selectRolesColumnOptions,
  (members: Member[], columnOptions: ColumnOptions[]): RolesContainerState => ({ members, columnOptions }),
);

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { ColumnOptions, Member } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';
import { MemberWithRoleOptions, selectMembersWithRoleOptions } from '../../selectors/roles.selectors';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  columnOptions: ColumnOptions[] = [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: MemberWithRoleOptions) => row.firstName,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: MemberWithRoleOptions) => row.lastName,
    ),
    new ColumnOptions(
      'role',
      'Role',
      (row: MemberWithRoleOptions) => row.role,
      (row: MemberWithRoleOptions) => row.roleOptions,
    ),
  ];
  members$: Observable<MemberWithRoleOptions[]>;

  constructor(public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.members$ = this.store$.pipe(select(selectMembersWithRoleOptions));
  }

  onUpdateUser(user: Member) {
    this.store$.dispatch(new SettingsActions.UpdateRole(user));
  }

  onDeleteUser($event) {
    // TODO: Implement me
  }
}

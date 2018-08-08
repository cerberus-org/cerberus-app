import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { ColumnOptions, Member } from '../../../shared/models';
import { UpdateRole } from '../../actions/settings.actions';
import { getMembersWithRoleOptions, MemberWithRoleOptions } from '../../selectors/roles.selectors';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'firstName',
      header: 'First Name',
      cell: (row: MemberWithRoleOptions) => row.firstName,
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
      cell: (row: MemberWithRoleOptions) => row.lastName,
    },
    {
      columnDef: 'role',
      header: 'Role Name',
      cell: (row: MemberWithRoleOptions) => row.role,
      selectOptions: (row: MemberWithRoleOptions) => row.roleOptions,
    },
  ];
  members$: Observable<MemberWithRoleOptions[]>;

  constructor(public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.members$ = this.store$.pipe(select(getMembersWithRoleOptions));
  }

  onUpdateUser(user: Member) {
    this.store$.dispatch(new UpdateRole(user));
  }

  onDeleteUser($event) {
    // TODO: Implement me
  }
}

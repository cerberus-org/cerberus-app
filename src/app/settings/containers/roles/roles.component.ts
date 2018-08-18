import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { ColumnOptions, Member } from '../../../shared/models';
import { UpdateRole } from '../../actions/settings.actions';
import { getMembersWithRoleOptions, RoleTableRow } from '../../selectors/roles.selectors';

@Component({
  selector: 'app-roles',
  template: `
    <app-data-table
      [data$]="members$"
      [columnOptions]="columnOptions"
      (updateItem)="onUpdateRole($event)"
    >
    </app-data-table>
  `,
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: RoleTableRow) => row.user.name,
    },
    {
      columnDef: 'role',
      header: 'Role Name',
      cell: (row: RoleTableRow) => row.member.role,
      selectOptions: (row: RoleTableRow) => row.roleOptions,
    },
  ];
  members$: Observable<RoleTableRow[]>;

  constructor(public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.members$ = this.store$.pipe(select(getMembersWithRoleOptions));
  }

  onUpdateRole(member: Member) {
    this.store$.dispatch(new UpdateRole({ member }));
  }
}

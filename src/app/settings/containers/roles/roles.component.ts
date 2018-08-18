import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { ColumnOptions } from '../../../shared/models';
import { getMembersWithRoleOptions, RolesTableRow } from '../../selectors/roles.selectors';
import { EditRoleDialogComponent } from '../edit-role-dialog/edit-role-dialog.component';

@Component({
  selector: 'app-roles',
  template: `
    <app-data-table
      [data$]="members$"
      [columnOptions]="columnOptions"
      [showEdit]="true"
      [showRemove]="true"
      (editRow)="onEditRow($event)"
    ></app-data-table>
  `,
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  members$: Observable<RolesTableRow[]>;
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: RolesTableRow) => row.user.name,
    },
    {
      columnDef: 'role',
      header: 'Role Name',
      cell: (row: RolesTableRow) => row.member.role,
    },
  ];

  constructor(private dialog: MatDialog, public store$: Store<AppState>) {
    this.members$ = store$.pipe(select(getMembersWithRoleOptions));
  }

  onEditRow(row: RolesTableRow) {
    const config = new MatDialogConfig<RolesTableRow>();
    config.data = row;
    this.dialog.open(EditRoleDialogComponent, config);
  }
}

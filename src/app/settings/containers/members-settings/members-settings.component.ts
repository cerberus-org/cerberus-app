import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { ColumnOptions } from '../../../shared/models';
import { RemoveMember } from '../../actions/settings.actions';
import { getRolesTableRows, RolesTableRow } from '../../selectors/members-settings.selectors';
import { EditMemberDialogComponent } from '../edit-member-dialog/edit-member-dialog.component';

@Component({
  selector: 'app-roles',
  template: `
    <app-data-table
      [data$]="members$"
      [columnOptions]="columnOptions"
      [showEdit]="true"
      [showRemove]="true"
      (removeRow)="onRemoveRow($event)"
      (editRow)="onEditRow($event)"
    ></app-data-table>
  `,
  styleUrls: ['./members-settings.component.scss'],
})
export class MembersSettingsComponent {
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
    this.members$ = store$.pipe(select(getRolesTableRows));
  }

  onRemoveRow(row: RolesTableRow): void {
    this.store$.dispatch(new RemoveMember({ member: row.member }));
  }

  onEditRow(row: RolesTableRow): void {
    const config = new MatDialogConfig<RolesTableRow>();
    config.data = row;
    this.dialog.open(EditMemberDialogComponent, config);
  }

  shouldDisableActions(row: RolesTableRow): boolean {
    return !row.roleOptions || row.roleOptions.length < 2;
  }
}

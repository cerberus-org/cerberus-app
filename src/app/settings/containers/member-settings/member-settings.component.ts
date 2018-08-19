import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppState } from '../../../core/reducers';
import { getMemberForCurrentUserAndSelectedTeam } from '../../../core/selectors/members.selectors';
import { isAdmin } from '../../../shared/helpers';
import { ColumnOptions, Member } from '../../../shared/models';
import { RemoveMember } from '../../actions/settings.actions';
import { MemberTableRow } from '../../models/member-table-row';
import { getMemberTableRows } from '../../selectors/member-settings.selectors';
import { EditMemberDialogComponent } from '../edit-member-dialog/edit-member-dialog.component';

@Component({
  selector: 'app-member-settings',
  template: `
    <div class="table-container">
      <app-settings-header title="Members"></app-settings-header>
      <app-data-table
        [data$]="members$"
        [columnOptions]="columnOptions"
        [disableEdit]="shouldDisableEdit"
        [disableRemove]="shouldDisableRemove"
        [showEdit]="true"
        [showRemove]="true"
        (removeRow)="onRemoveRow($event)"
        (editRow)="onEditRow($event)"
      ></app-data-table>
    </div>
  `,
  styleUrls: ['./member-settings.component.scss'],
})
export class MemberSettingsComponent implements OnDestroy {
  currentMember: Member;
  currentMemberSubscription: Subscription;
  members$: Observable<MemberTableRow[]>;
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: MemberTableRow) => row.user && row.user.name,
    },
    {
      columnDef: 'role',
      header: 'Role',
      cell: (row: MemberTableRow) => row.member && row.member.role,
    },
  ];

  constructor(private dialog: MatDialog, public store$: Store<AppState>) {
    this.members$ = store$.pipe(select(getMemberTableRows));
    this.currentMemberSubscription = store$.pipe(select(getMemberForCurrentUserAndSelectedTeam))
      .subscribe((member) => {
        this.currentMember = member;
      });
  }

  ngOnDestroy(): void {
    this.currentMemberSubscription.unsubscribe();
  }

  onRemoveRow(row: MemberTableRow): void {
    this.store$.dispatch(new RemoveMember({ member: row.member }));
  }

  onEditRow(row: MemberTableRow): void {
    const config = new MatDialogConfig<MemberTableRow>();
    config.data = row;
    this.dialog.open(EditMemberDialogComponent, config);
  }

  shouldDisableEdit = (row: MemberTableRow): boolean => {
    return !row.roleOptions || row.roleOptions.length < 2;
  }

  /**
   * Allows the current user to remove themselves from the team, otherwise allows removal if role options are present.
   *
   * @param {MemberTableRow} row
   * @returns {boolean}
   */
  shouldDisableRemove = (row: MemberTableRow): boolean => {
    return row.member.id === this.currentMember.id && !isAdmin(row.member) ? false : this.shouldDisableEdit(row);
  }
}
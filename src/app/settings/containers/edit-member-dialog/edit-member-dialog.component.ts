import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { Roles } from '../../../shared/models/roles';
import { UpdateRole } from '../../actions/settings.actions';
import { MemberTableRow } from '../../models/member-table-row';

@Component({
  selector: 'app-edit-member-dialog',
  template: `
    <h2 mat-dialog-title>Edit Member</h2>
    <mat-dialog-content class="edit-role-dialog">
      <div class="form-container">
        <mat-form-field class="form-container">
          <mat-select
            placeholder="Edit {{dialogData.user.name}}'s role"
            [disabled]="isDisabled"
            [(value)]="selectedRole"
          >
            <mat-option *ngFor="let role of dialogData.roleOptions" [value]="role">{{role}}</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary" (click)="submit()">Submit</button>
      <button mat-button mat-dialog-close color="primary">Cancel</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./edit-member-dialog.component.scss'],
})
export class EditMemberDialogComponent {
  selectedRole: Roles;

  constructor(
    private store$: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public dialogData: MemberTableRow,
  ) {
    this.selectedRole = dialogData.member.role;
  }

  submit(): void {
    this.store$.dispatch(new UpdateRole({ member: { ...this.dialogData.member, role: this.selectedRole } }));
  }

  get isDisabled(): boolean {
    return !this.dialogData.roleOptions || this.dialogData.roleOptions.length < 2;
  }
}

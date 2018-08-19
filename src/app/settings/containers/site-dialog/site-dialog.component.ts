import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getMemberForCurrentUserAndSelectedTeam } from '../../../core/selectors/members.selectors';
import { Member, Site } from '../../../shared/models';

@Component({
  selector: 'app-site-dialog',
  template: `
    <h2 mat-dialog-title>Edit Site</h2>
    <mat-dialog-content>
      <div class="form-container">
        <mat-form-field class="example-full-width" autocomplete="off">
          <mat-label>Name</mat-label>
          <input matInput autocomplete="off" placeholder="Site name" [(ngModel)]="name">
        </mat-form-field>
        <mat-form-field class="example-full-width" autocomplete="off">
          <mat-label>Description</mat-label>
          <input matInput autocomplete="off" placeholder="Site description" [(ngModel)]="description">
        </mat-form-field>
        <mat-form-field class="example-full-width" autocomplete="off">
          <mat-label>Address</mat-label>
          <input matInput autocomplete="off" placeholder="Address" [(ngModel)]="address">
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button color="primary" (click)="submit()">Submit</button>
      <button mat-button mat-dialog-close color="primary">Cancel</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./site-dialog.component.scss'],
})
export class SiteDialogComponent implements OnInit {
  name: string;
  description: string;
  address: string;

  public member: Member;
  public memberSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<SiteDialogComponent>,
    public store$: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // If a site was passed in, set default fields
    this.name = this.data ? this.data.name : '';
    this.description = this.data ? this.data.description : '';
    this.address = this.data ? this.data.address : '';
  }

  ngOnInit(): void {
    this.memberSubscription = this.store$.pipe(select(getMemberForCurrentUserAndSelectedTeam)).subscribe((member: Member) => {
      this.member = member;
    });
  }

  ngOnDestroy(): void {
    if (this.memberSubscription) {
      this.memberSubscription.unsubscribe();
    }
  }

  /**
   * Close dialog and pass back data.
   */
  submit() {
    // If there was  data passed in this dialog was opened for edit
    if (this.data) {
      this.dialogRef.close(Object.assign({}, new Site(this.member.teamId, this.name, this.address, this.description), { id: this.data.id }));
      // Otherwise dialog was opened for creation
    } else {
      this.dialogRef.close(new Site(this.member.teamId, this.name, this.address, this.description));
    }
  }
}

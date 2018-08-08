import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getMemberForUserAndSelectedTeam } from '../../../core/selectors/members.selectors';
import { Member, Site } from '../../../shared/models';

@Component({
  selector: 'app-site-dialog',
  templateUrl: './site-dialog.component.html',
  styleUrls: ['./site-dialog.component.scss'],
})
export class SiteDialogComponent implements OnInit {
  name: string;
  description: string;
  address: string;

  public member: Member;
  public memberSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<SiteDialogComponent>, public store$: Store<AppState>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // If a site was passed in, set default fields
    this.name = this.data ? this.data.name : '';
    this.description = this.data ? this.data.description : '';
    this.address = this.data ? this.data.address : '';
  }

  ngOnInit(): void {
    this.memberSubscription = this.store$.pipe(select(getMemberForUserAndSelectedTeam)).
    subscribe((member: Member) => {
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
  close() {
    // If there was  data passed in this dialog was opened for edit
    if (this.data) {
      this.dialogRef.close(Object.assign({}, new Site(this.member.teamId, this.name, this.address, this.description), { id: this.data.id }));
    // Otherwise dialog was opened for creation
    } else {
      this.dialogRef.close(new Site(this.member.teamId, this.name, this.address, this.description));
    }
  }
}

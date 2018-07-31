import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/index';
import { selectSessionMember } from '../../../auth/selectors/session.selectors';
import { AppState } from '../../../core/reducers';
import { Member, Site } from '../../../shared/models';

@Component({
  selector: 'app-site-dialog',
  templateUrl: './site-dialog.component.html',
  styleUrls: ['./site-dialog.component.scss'],
})
export class SiteDialogComponent implements OnInit {
  label: string;
  description: string;
  address: string;

  public member: Member;
  public memberSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<SiteDialogComponent>, public store$: Store<AppState>) {
    this.label = '';
    this.description = '';
    this.address = '';
  }

  ngOnInit(): void {
    this.memberSubscription = this.store$.pipe(select(selectSessionMember)).
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
    this.dialogRef.close(new Site(this.member.organizationId, this.label, this.address, this.description));
  }
}

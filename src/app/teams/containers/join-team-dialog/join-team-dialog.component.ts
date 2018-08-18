import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/reducers';
import { Team } from '../../../shared/models';
import { JoinTeam } from '../../actions/teams-page.actions';

@Component({
  selector: 'app-join-team-dialog',
  template: `
    <mat-dialog-content>
      <div class="grid grid--center">
        <i class="material-icons icon-image">search</i>
        <h2 *ngIf="title">{{title}}</h2>
        <p *ngIf="subtitle" class="subtitle">{{subtitle}}</p>
        <app-team-search (selectTeam)="onSelectTeam($event)"></app-team-search>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary" [disabled]="!validTeam" (click)="submit()">Confirm</button>
      <button mat-button mat-dialog-close color="primary">Cancel</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./join-team-dialog.component.scss'],
})
export class JoinTeamDialogComponent {
  title = 'Find your team';
  subtitle = 'We\'ll let your team know that you are requesting to join.';
  validTeam: Team;

  constructor(
    private dialogRef: MatDialogRef<JoinTeamDialogComponent>,
    private store$: Store<AppState>,
  ) {}

  onSelectTeam(team: Team) {
    this.validTeam = team;
  }

  submit() {
    this.store$.dispatch(new JoinTeam({ team: this.validTeam }));
  }
}

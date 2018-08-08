import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { Team } from '../../../shared/models';
import { JoinTeam } from '../../actions/teams.actions';

@Component({
  selector: 'app-join-team-dialog',
  template: `
    <div class="dialog">
      <div class="grid grid--center">
        <i class="material-icons icon-image">search</i>
        <h1 *ngIf="title">{{title}}</h1>
        <p *ngIf="subtitle" class="subtitle">{{subtitle}}</p>
        <app-team-search (selectTeam)="onSelectTeam($event)"></app-team-search>
        <div class="actions-container">
          <button mat-button color="primary" (click)="close()">Cancel</button>
          <button mat-button color="primary" (click)="submit()" [disabled]="!validTeam">Confirm</button>
        </div>
      </div>
    </div>
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
  ) { }

  onSelectTeam(team: Team) {
    this.validTeam = team;
  }

  submit() {
    this.store$.dispatch(new JoinTeam({ team: this.validTeam }));
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}

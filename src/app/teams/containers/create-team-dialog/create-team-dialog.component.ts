import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/reducers';
import { Team } from '../../../shared/models';
import { CreateTeam } from '../../actions/teams-page.actions';

@Component({
  selector: 'app-create-team-dialog',
  template: `
    <mat-dialog-content>
      <div class="grid grid--center">
        <i class="material-icons icon-image">group_work</i>
        <h1 *ngIf="title">{{title}}</h1>
        <p *ngIf="subtitle" class="subtitle">{{subtitle}}</p>
        <app-team-form (validTeam)="onValidTeam($event)"></app-team-form>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary" [disabled]="!validTeam" (click)="submit()">Confirm</button>
      <button mat-button mat-dialog-close color="primary">Cancel</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./create-team-dialog.component.scss'],
})
export class CreateTeamDialogComponent {
  title = 'Create a new team';
  subtitle = 'Tell us more about your team to get started. Don\'t worry, you will be able to change these later.';
  validTeam: Team;

  constructor(
    private dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    private store$: Store<AppState>,
  ) {}

  onValidTeam(team: Team) {
    this.validTeam = team;
  }

  submit() {
    this.store$.dispatch(new CreateTeam({ team: this.validTeam }));
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/reducers';
import { Team } from '../../../shared/models';
import { CreateTeam } from '../../actions/teams-page.actions';

@Component({
  selector: 'app-create-team-dialog',
  template: `
    <div class="dialog">
      <div class="grid grid--center">
        <i class="material-icons icon-image">group_work</i>
        <h1 *ngIf="title">{{title}}</h1>
        <p *ngIf="subtitle" class="subtitle">{{subtitle}}</p>
        <app-team-form (validTeam)="onValidTeam($event)"></app-team-form>
        <div class="actions-container">
          <button mat-button color="primary" (click)="close()">Cancel</button>
          <button mat-button color="primary" (click)="submit()" [disabled]="!validTeam">Confirm</button>
        </div>
      </div>
    </div>
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
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}

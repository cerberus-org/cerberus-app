import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SessionReducerState } from '../../../auth/reducers/session.reducer';
import { getSelectedTeam } from '../../../core/selectors/model.selectors';
import { Team } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';

@Component({
  selector: 'app-team-settings',
  template: `
    <div class="wrapper">
      <div>
        <h2>Update your team info here.</h2>
        <mat-divider></mat-divider>
      </div>
      <div class="margin">
        <app-team-form
          [title]="teamFormTitle"
          [initialTeam]="(sessionTeam$ | async)"
          (validTeam)="onValidTeam($event)">
        </app-team-form>
      </div>
      <div class="actions-container">
        <button
          mat-raised-button
          color="primary"
          (click)="onSubmitTeam(teamEdits)"
          [disabled]="!teamEdits">
          Submit
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./team-settings.component.scss'],
})
export class TeamSettingsComponent implements OnInit {
  teamFormTitle = 'Update your team info.';
  teamEdits: Team;
  sessionTeam$: Observable<Team>;

  constructor(public store$: Store<SessionReducerState>) {}

  ngOnInit(): void {
    this.sessionTeam$ = this.store$.pipe(select(getSelectedTeam));
  }

  /**
   * Handles validTeam events by setting teamEdits.
   * @param team - an team when valid, null when invalid
   */
  onValidTeam(team: Team) {
    this.teamEdits = team;
  }

  /**
   * Handles submission of team form by dispatching an SetTeam action.
   */
  onSubmitTeam(team: Team) {
    this.store$.dispatch(new SettingsActions.UpdateTeam(team));
  }
}

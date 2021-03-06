import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthReducerState } from '../../../auth/reducers/auth.reducer';
import { getSelectedTeam } from '../../../core/selectors/teams.selectors';
import { Team } from '../../../shared/models';
import { UpdateTeam } from '../../actions/settings.actions';

@Component({
  selector: 'app-team-settings',
  template: `
    <app-settings-toolbar title="Team"></app-settings-toolbar>
    <div class="wrapper">
      <div>
        <p>Update your team info here.</p>
        <mat-divider></mat-divider>
      </div>
      <div class="margin">
        <app-team-form
          [title]="teamFormTitle"
          [initialTeam]="(sessionTeam$ | async)"
          (validTeam)="onValidTeam($event)"
        >
        </app-team-form>
      </div>
      <div class="actions-container">
        <button
          mat-raised-button
          color="primary"
          (click)="onSubmitTeam(teamEdits)"
          [disabled]="!teamEdits"
        >
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

  constructor(public store$: Store<AuthReducerState>) {}

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
    this.store$.dispatch(new UpdateTeam({ team }));
  }
}

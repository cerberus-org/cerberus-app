import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SessionReducerState } from '../../../auth/reducers/session.reducer';
import { getSelectedTeam } from '../../../core/selectors/model.selectors';
import { Team } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';

@Component({
  selector: 'app-organization-settings',
  template: `
    <div class="wrapper">
      <div>
        <h2>Update your team info here.</h2>
        <mat-divider></mat-divider>
      </div>
      <div class="margin">
        <app-team-form
          [title]="organizationFormTitle"
          [initialTeam]="(sessionOrganization$ | async)"
          (validTeam)="onValidOrganization($event)">
        </app-team-form>
      </div>
      <div class="actions-container">
        <button
          mat-raised-button
          color="primary"
          (click)="onSubmitOrganization(organizationEdits)"
          [disabled]="!organizationEdits">
          Submit
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./organization-settings.component.scss'],
})
export class OrganizationSettingsComponent implements OnInit {
  organizationFormTitle = 'Update your team info.';
  organizationEdits: Team;
  sessionOrganization$: Observable<Team>;

  constructor(public store$: Store<SessionReducerState>) {}

  ngOnInit(): void {
    this.sessionOrganization$ = this.store$.pipe(select(getSelectedTeam));
  }

  /**
   * Handles validTeam events by setting organizationEdits.
   * @param organization - an organization when valid, null when invalid
   */
  onValidOrganization(organization: Team) {
    this.organizationEdits = organization;
  }

  /**
   * Handles submission of organization form by dispatching an SetOrganization action.
   */
  onSubmitOrganization(organization: Team) {
    this.store$.dispatch(new SettingsActions.UpdateOrganization(organization));
  }
}

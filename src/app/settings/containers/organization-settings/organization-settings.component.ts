import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SessionReducerState } from '../../../auth/reducers/session.reducer';
import { selectSessionOrganization } from '../../../auth/selectors/session.selectors';
import { Organization } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss'],
})
export class OrganizationSettingsComponent implements OnInit {
  organizationFormTitle = 'Update your organization info.';
  organizationEdits: Organization;
  sessionOrganization$: Observable<Organization>;

  constructor(public store$: Store<SessionReducerState>) {}

  ngOnInit(): void {
    this.sessionOrganization$ = this.store$.pipe(select(selectSessionOrganization));
  }

  /**
   * Handles validOrganization events by setting organizationEdits.
   * @param organization - an organization when valid, null when invalid
   */
  onValidOrganization(organization: Organization) {
    this.organizationEdits = organization;
  }

  /**
   * Handles submission of organization form by dispatching an SetOrganization action.
   */
  onSubmitOrganization(organization: Organization) {
    this.store$.dispatch(new SettingsActions.UpdateOrganization(organization));
  }
}

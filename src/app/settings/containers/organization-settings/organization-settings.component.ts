import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SessionState } from 'http2';
import { Observable } from 'rxjs';
import { selectSessionOrganization } from '../../../auth/store/selectors/session.selectors';
import { Organization } from '../../../models';
import * as SettingsActions from '../../store/actions/settings.actions';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss'],
})
export class OrganizationSettingsComponent {
  organizationFormTitle = 'Update your organization info.';
  organizationEdits: Organization;
  sessionOrganization$: Observable<Organization> = this.store$.pipe(select(selectSessionOrganization));

  constructor(public store$: Store<SessionState>) {}

  /**
   * Handles validOrganization events by setting organizationEdits.
   * @param organization - a valid organization when valid, null when invalid
   */
  onValidOrganization(organization: Organization) {
    this.organizationEdits = organization;
  }

  /**
   * Handles submission of organization form by dispatching an UpdateOrganization action.
   */
  onSubmitOrganization(organization: Organization) {
    this.store$.dispatch(new SettingsActions.UpdateOrganization(organization));
  }
}

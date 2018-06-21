import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSessionReducerState } from '../../../auth/store/selectors/session.selectors';
import { Organization } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';

@Component({
  selector: 'app-organization-settings',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss'],
})
export class OrganizationSettingsComponent implements OnInit, OnDestroy {
  organizationFormTitle = 'Update your organization info.';
  private sessionSubscription: Subscription;
  currentOrganization: Organization;
  organizationChanges: Organization;

  constructor(public store$: Store<RootState>) { }

  ngOnInit() {
    this.sessionSubscription = this.store$.pipe(select(selectSessionReducerState))
      .subscribe((state) => {
        this.currentOrganization = state.organization;
      });
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  /**
   * Handles organizationChanges events by setting organizationChanges.
   * @param organization - a valid organization when valid, null when invalid
   */
  onValidOrganization(organization: Organization) {
    this.organizationChanges = organization;
  }

  /**
   * Handles submission of organization form by dispatching an UpdateOrganization action.
   */
  onSubmitOrganization(organization: Organization) {
    this.store$.dispatch(new SettingsActions.UpdateOrganization(
      Object.assign({}, this.currentOrganization, organization),
    ));
  }
}

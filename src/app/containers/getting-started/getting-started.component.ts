import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as AppActions from '../../actions/app.actions';
import * as GettingStartedActions from '../../actions/getting-started.actions';
import { HeaderOptions, Organization, User } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent implements OnInit, OnDestroy {
  private gettingStartedSubscription: Subscription;
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Getting Started',
    'wb_sunny',
    '/home',
    true,
  );

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  userFormTitle: string;
  organizationFormTitle: string;

  step: number;
  validOrganization: Organization;
  validUser: User;
  isTosChecked: boolean;

  constructor(private store: Store<State>) {
    this.userFormTitle = 'Create an account to access your organization.';
    this.organizationFormTitle = 'Tell us about your organization.';
  }

  ngOnInit(): void {
    this.gettingStartedSubscription = this.store
      .select('gettingStarted')
      .subscribe((state) => {
        this.step = state.step;
        this.validOrganization = state.validOrganization;
        this.validUser = state.validUser;
      });

    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  ngOnDestroy(): void {
    if (this.gettingStartedSubscription) {
      this.gettingStartedSubscription.unsubscribe();
    }
  }

  onTosChecked(isChecked: boolean) {
    this.isTosChecked = isChecked;
  }

  onValidOrganization(organization: Organization): void {
    this.store.dispatch(new GettingStartedActions.UpdateValidOrganization(organization));
  }

  onValidUser(user: User): void {
    this.store.dispatch(new GettingStartedActions.UpdateValidUser(user));
  }

  onNext(step): void {
    this.store.dispatch(new GettingStartedActions.NextStep(step));
    this.tabGroup.selectedIndex = step;
  }

  /**
   * Dispatches the Submit action.
   */
  onSubmit(): void {
    this.store.dispatch(new GettingStartedActions.Submit({
      organization: this.validOrganization,
      user: this.validUser,
    }));
  }

  onCheck(e): void {
    this.isTosChecked = e.checked;
  }
}

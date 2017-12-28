import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as AppActions from '../../actions/app.actions';
import * as GettingStartedActions from '../../actions/getting-started.actions';
import { HeaderOptions } from '../../models/header-options';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';
import { State } from '../../reducers/index';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  gettingStartedSubscription: Subscription;
  step: number;
  validOrganization: Organization;
  validUser: User;
  userFormTitle: string;
  organizationFormTitle: string;

  constructor(private store: Store<State>) {
    this.userFormTitle = 'Create an account to access your organization.';
    this.organizationFormTitle = 'Tell us about your organization.';
  }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.SetHeaderOptions(
      new HeaderOptions(
        'Getting Started',
        'wb_sunny',
        '/login'
      )
    ));
    this.store.dispatch(new AppActions.SetSidenavOptions(null));

    this.gettingStartedSubscription = this.store
      .select('gettingStarted')
      .subscribe(state => {
        this.step = state.step;
        this.validOrganization = state.validOrganization;
        this.validUser = state.validUser;
      });
  }

  ngOnDestroy(): void {
    if (this.gettingStartedSubscription) {
      this.gettingStartedSubscription.unsubscribe();
    }
  }

  onValidOrganization(organization: Organization): void {
    this.store.dispatch(new GettingStartedActions.UpdateValidOrganization(organization))
  }

  onValidUser(user: User): void {
    this.store.dispatch(new GettingStartedActions.UpdateValidUser(user))
  }

  onNext(step): void {
    this.store.dispatch(new GettingStartedActions.NextStep(step));
    this.tabGroup.selectedIndex = step;
  };

  /**
   * Dispatches the Submit action.
   */
  onSubmit(): void {
    this.store.dispatch(new GettingStartedActions.Submit({
      organization: this.validOrganization,
      user: this.validUser
    }));
  };
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as AppActions from '../../actions/app.actions';
import * as GettingStartedActions from '../../actions/getting-started.actions';
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

  constructor(private store: Store<State>) {
    this.userFormTitle = 'Create an account to access your organization.'
  }

  ngOnInit(): void {
    this.gettingStartedSubscription = this.store
      .select('gettingStarted')
      .subscribe(state => {
        this.tabGroup.selectedIndex = state.selectedTabIndex;
        this.step = state.step;
        this.validOrganization = state.validOrganization;
        this.validUser = state.validUser;
      });
    this.store.dispatch(
      new AppActions.SetPageConfig({
        sidenavOptions: {},
        headerOptions: {
          previousUrl: '/login',
          icon: 'wb_sunny',
          title: 'Getting Started'
        }
      })
    );
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

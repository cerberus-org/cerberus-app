import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as GettingStartedActions from '../../actions/getting-started.actions';
import { AppState } from '../../reducers/index';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';

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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.gettingStartedSubscription = this.store
      .select('gettingStarted')
      .subscribe(state => {
        this.tabGroup.selectedIndex = state.selectedTabIndex;
        this.step = state.step;
        this.validOrganization = state.validOrganization;
        this.validUser = state.validUser;
      });
  }

  ngOnDestroy() {
    this.gettingStartedSubscription.unsubscribe();
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

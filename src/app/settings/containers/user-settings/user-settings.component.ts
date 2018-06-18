import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as SettingsActions from '../../../actions/settings.actions';
import { User } from '../../../models';
import { State } from '../../../reducers';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  userFormTitle = 'Update your user info.';
  userChanges: User;
  currentUser: User;

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.authSubscription = this.store.select('auth')
      .subscribe((state) => {
        this.currentUser = state.user;
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Handles userChanges events by setting userChanges.
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.userChanges = user;
  }

  /**
   * Handles submission of user form by dispatching an UpdateUser action.
   */
  onSubmitUser(user: User) {
    this.store.dispatch(new SettingsActions.UpdateUser(
      Object.assign({}, this.currentUser, user),
    ));
  }
}

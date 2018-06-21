import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSessionReducerState } from '../../../auth/store/selectors/session.selectors';
import { User } from '../../../models';
import { State } from '../../../root/store/reducers/index';
import * as SettingsActions from '../../store/actions/settings.actions';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  private sessionSubscription: Subscription;
  userFormTitle = 'Update your user info.';
  userChanges: User;
  currentUser: User;

  constructor(public store: Store<RootState>) { }

  ngOnInit() {
    this.sessionSubscription = this.store.pipe(select(selectSessionReducerState))
      .subscribe((state) => {
        this.currentUser = state.user;
      });
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
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

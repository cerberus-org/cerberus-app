import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { selectSessionUser } from '../../../auth/store/selectors/session.selectors';
import { User } from '../../../models';
import * as SettingsActions from '../../store/actions/settings.actions';
import { SettingsState } from '../../store/reducers';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  userFormTitle = 'Update your user info.';
  userEdits: User;
  sessionUser$: Observable<User>;

  constructor(public store$: Store<SettingsState>) {}

  ngOnInit(): void {
    this.sessionUser$ = this.store$.pipe(select(selectSessionUser));
  }

  /**
   * Handles validUser events by setting userEdits.
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.userEdits = user;
  }

  /**
   * Handles submission of user form by dispatching an UpdateUser action.
   */
  onSubmitUser(user: User) {
    this.store$.dispatch(new SettingsActions.UpdateUser(user));
  }
}

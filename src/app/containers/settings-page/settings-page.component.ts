import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppActions from '../../actions/app.actions';
import * as RouterActions from '../../actions/router.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { HeaderOptions } from '../../models/header-options';
import { SidenavOptions } from '../../models/sidenav-options';
import { User } from '../../models/user';
import { State } from '../../reducers';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  userFormTitle: string;
  validUser: User;

  constructor(private store: Store<State>) {
    this.userFormTitle = 'Update user data.'
  }

  ngOnInit() {
    this.store.dispatch(new AppActions.SetHeaderOptions(
      new HeaderOptions(
        'Settings',
        'settings',
        '/dashboard'
      )
    ));
    this.store.dispatch(new AppActions.SetSidenavOptions([
      new SidenavOptions('User', 'face', null),
      new SidenavOptions('Organization', 'domain', null)
    ]));
  }

  /**
   * Once the user-form emits an event,
   * set user.
   * @param $event
   */
  setUser($event) {
    this.validUser = $event;
  }

  onSubmit() {
    this.store.dispatch(new SettingsActions.UpdateUser(this.validUser));
  }
}

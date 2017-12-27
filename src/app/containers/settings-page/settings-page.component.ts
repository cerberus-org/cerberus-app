import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SettingsActions from '../../actions/settings.actions';
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

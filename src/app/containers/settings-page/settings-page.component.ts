import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SettingsActions from '../../actions/settings.actions';
import { State } from '../../reducers';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  userFormTitle: string;

  constructor(private store: Store<State>) {
    this.userFormTitle = 'Update user data.'
  }

  ngOnInit() {
  }

  /**
   * Once the new-user-form emits an event,
   * set user.
   * @param $event
   */
  setUser($event) {
    this.store.dispatch(new SettingsActions.UpdateUser($event));
  }
}

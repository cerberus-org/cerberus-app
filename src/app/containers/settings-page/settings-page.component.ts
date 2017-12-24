import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  user: User;
  userFormTitle: string;

  constructor() {
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
    this.user = $event;
  }
}

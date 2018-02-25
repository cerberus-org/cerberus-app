import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {

  validUser: User;
  userFormTitle: string;

  constructor() {
    this.userFormTitle = 'Please enter your information.';
  }

  ngOnInit() {}

  /**
   * Handles validUser events by setting validUser.
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.validUser = user;
  }

  onJoinOrganization() {}
}

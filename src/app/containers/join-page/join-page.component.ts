import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {

  userFormTitle: string;
  validUser: User;

  constructor() {
    this.userFormTitle = 'Please enter your information.'
  }

  ngOnInit() {
  }

  onValidUser(user: User) {
    this.validUser = user;
  }

  onJoinOrganization() {

  }
}

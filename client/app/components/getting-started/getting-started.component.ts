import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
  step: number;
  validOrganization: boolean;
  validUser: boolean;
  organization: Organization;
  user: User;

  constructor() { }

  ngOnInit() {
    this.step = 0;
  }

  setStep(value) {
    this.step = value > this.step ? value : this.step;
  };
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
  step: number;
  validOrganization;
  validUser;

  constructor() { }

  ngOnInit() {
    this.step = 0;
  }

  setStep(value) {
    this.step = value > this.step ? value : this.step;
  };
}

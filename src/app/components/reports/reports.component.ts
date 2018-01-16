import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportOptions: string[];

  constructor() {
    this.reportOptions = ['Individual Volunteer Hours', 'All Volunteer Hours']
  }

  ngOnInit() {
  }
}

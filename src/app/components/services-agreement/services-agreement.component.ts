import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-agreement',
  templateUrl: './services-agreement.component.html',
  styleUrls: ['./services-agreement.component.scss'],
})
export class ServicesAgreementComponent implements OnInit {

  @Input() showTitle: boolean;

  constructor() { }

  ngOnInit() {}
}

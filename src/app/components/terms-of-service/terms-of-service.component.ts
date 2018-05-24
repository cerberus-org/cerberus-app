import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent implements OnInit {

  @Input() showTitle: boolean;

  constructor() { }

  ngOnInit() {}
}

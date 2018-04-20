import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent implements OnInit {

  @Output() isTosChecked = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onCheck (e) {
    this.isTosChecked.emit(e.checked);
  }
}

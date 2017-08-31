import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @Output() onComplete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onNext = () => {
    this.onComplete.emit();
  }
}

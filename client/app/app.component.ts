import { Component, OnInit } from '@angular/core';
import { VisitService } from './services/visit.service';

const daysToSubtract = 7;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private visitService: VisitService) { }

  ngOnInit() {
    this.visitService.getRxByDate(new Date(new Date().getTime() - (daysToSubtract * 24 * 60 * 60 * 1000)));
  }
}

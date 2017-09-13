import { Component, OnInit } from '@angular/core';
import { VisitService } from './services/visit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private visitService: VisitService) { }

  ngOnInit() {
    this.getVisitsByDate(7);
  }

  getVisitsByDate(daysToSubtract: number): void {
    this.visitService.getByDateRx(new Date(new Date().getTime() - (daysToSubtract * 24 * 60 * 60 * 1000)));
  }
}

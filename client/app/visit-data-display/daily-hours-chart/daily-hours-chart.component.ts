import { Component, OnInit } from '@angular/core';
import { Visit } from '../../models/visit';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.css']
})
export class DailyHoursChartComponent implements OnInit {
  visits: Visit[];
  visitsByDate: Map<string, Visit[]>;
  lineChartData: number[];
  lineChartLabels: string[];
  error: string;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subscribeToVisits();
    this.mapVisitsToDate(this.visits);
  }

  subscribeToVisits(): void {
    this.store.select<Visit[]>('visits').subscribe(
      visits => this.visits = visits,
      error => this.error = <any>error);
  }

  mapVisitsToDate(visits) {
    const map = new Map<string, Visit[]>();
    visits.forEach(visit => {
      const date = visit.startedAt.toDateString();
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date).push(visit);
    });
    this.visitsByDate = map;
  }
}

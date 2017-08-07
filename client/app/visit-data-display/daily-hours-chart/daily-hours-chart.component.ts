import { Component, OnInit } from '@angular/core';
import { Visit } from '../../models/visit';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.css']
})
export class DailyHoursChartComponent implements OnInit {
  visitsByDate: Map<string, Visit[]>;
  lineChartData: number[];
  lineChartLabels: string[];
  error: string;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subscribeToVisits();
  }

  subscribeToVisits(): void {
    this.store.select<Visit[]>('visits').subscribe(
      visits => {
        this.mapVisitsToDate(visits);
        this.setLineChartLabels();
        this.setLineChartData();
        console.log(this.visitsByDate);
        console.log(this.lineChartLabels);
        console.log(this.lineChartData);
      }, error => this.error = <any>error);
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

  setLineChartLabels(): void {
    this.lineChartLabels = Array.from(Array(7), (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toDateString();
    });
  }

  setLineChartData(): void {
    this.lineChartData = this.lineChartLabels.map(date => this.visitsByDate.has(date)
      ? Math.floor(this.visitsByDate.get(date)
        .reduce((total, currentVisit) => total + this.getDuration(currentVisit), 0) / 3600000)
      : null);
  }

  getDuration(visit: Visit): number {
    return visit.endedAt.getTime() - visit.startedAt.getTime();
  }

}

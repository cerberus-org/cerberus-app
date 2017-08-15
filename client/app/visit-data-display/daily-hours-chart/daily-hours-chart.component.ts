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
  lineChartData: any[];
  lineChartLabels: string[];
  lineChartOptions: any = { responsive: true, maintainAspectRatio: false };
  lineChartType = 'line';
  error: string;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.lineChartLabels = [];
    this.lineChartData = [];
    this.subscribeToVisits();
  }

  subscribeToVisits(): void {
    this.store.select<Visit[]>('visits').subscribe(
      visits => {
        this.mapVisitsToDate(visits);
        this.setLineChartLabels();
        this.setLineChartData();
      }, error => this.error = <any>error);
  }

  mapVisitsToDate(visits) {
    const map = new Map<string, Visit[]>();
    visits.forEach(visit => {
      if (visit.endedAt) {
        const date = visit.startedAt.toDateString();
        if (!map.has(date)) {
          map.set(date, []);
        }
        map.get(date).push(visit);
      }
    });
    this.visitsByDate = map;
  }

  setLineChartLabels(date: Date = new Date()): void {
    const labels = Array.from(Array(7), (_, i) => {
      date.setDate(date.getDate() - i);
      return date.toDateString();
    });
    labels.reverse();
    this.lineChartLabels = labels;
  }

  setLineChartData(): void {
    this.lineChartData = [{
      data: this.lineChartLabels.map(date => this.visitsByDate.has(date)
        ? Math.floor(this.visitsByDate.get(date)
          .reduce((total, currentVisit) => total + this.getDuration(currentVisit), 0) / 3600000)
        : 0),
      label: 'Hours'
    }];
  }

  getDuration(visit: Visit): number {
    return visit.endedAt.getTime() - visit.startedAt.getTime();
  }
}

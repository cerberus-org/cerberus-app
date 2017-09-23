import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Visit } from '../../../../models/visit';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.css']
})
export class DailyHoursChartComponent implements OnInit {
  visitsByDate: Map<string, Visit[]>;
  lineChartData: any[];
  lineChartLabels: string[];
  lineChartOptions = { responsive: true, maintainAspectRatio: false };
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
        this.visitsByDate = this.mapVisitsToDate(visits);
        this.lineChartLabels = this.setLineChartLabels();
        this.lineChartData = this.setLineChartData(this.lineChartLabels, this.visitsByDate);
      }, error => this.error = <any>error);
  }

  /**
   * Maps visits to their start dates.
   * @param visits  the array of visits to map
   */
  mapVisitsToDate(visits: Visit[]) {
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
    return map;
  }

  /**
   * Creates an array of chart labels based on a given date and count.
   * @param {Date} latest  the latest date that will be used as the rightmost label.
   * @param count          the number of previous dates to use as labels, defaults to 7 for week view
   */
  setLineChartLabels(latest: Date = new Date(), count: number = 7): string[] {
    const labels = Array.from(Array(count), (_, i) => {
      const date = new Date(latest.getTime());
      date.setDate(date.getDate() - i);
      return date.toDateString();
    });
    labels.reverse();
    return labels;
  }

  /**
   * Creates data structure for chart data by reducing visits for each date to the sum of visit durations in hours.
   */
  setLineChartData(labels: string[], visitsByDate: any): any[] {
    return [{
      data: labels.map(date => visitsByDate.has(date)
        ? Math.floor(visitsByDate.get(date)
          .reduce((total, currentVisit) => total + this.getDuration(currentVisit), 0) / 3600000)
        : 0),
      label: 'Hours'
    }];
  }

  /**
   * Returns the duration of a visit in milliseconds.
   */
  getDuration(visit: Visit): number {
    return visit.endedAt.getTime() - visit.startedAt.getTime();
  }
}

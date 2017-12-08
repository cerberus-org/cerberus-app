import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

import { Visit } from '../../models/visit';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.scss']
})
export class DailyHoursChartComponent implements OnInit, OnChanges   {
  @Input() visits: Visit[];
  data: LineChartData[];
  labels: string[];
  options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        bottom: 10
      }
    }
  };
  type = 'line';

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visits']) {
      this.labels = this.setupLineChartLabels();
      this.data = this.setupLineChartData(changes['visits'].currentValue, this.labels);
    }
  }

  /**
   * Constructs line chart labels based on latest date, count, unit, and format.
   * @return {Array<string>} - the array of chart labels
   */
  setupLineChartLabels(): string[] {
    // The latest date that will be used as the rightmost label
    const latest: Date = new Date();
    // The number of previous dates to use as labels
    const count = 7;
    // How each date should be displayed (refer to Moment.js formats)
    const format = 'ddd MMM D';
    // The unit to use for mapping to dates (refer to Moment.js keys)
    const unit: moment.unitOfTime.DurationConstructor = 'days';

    const labels = Array.from(Array(count), (_, i) => {
      const date = moment(latest.getTime());
      date.subtract(i, unit);
      return date.format(format);
    });
    labels.reverse();
    return labels;
  };

  /**
   * Maps visits to dates and returns the labels and data for the lineChart.
   * @param visits - the visits that will be used
   * @param labels - the array of chart labels
   */
  setupLineChartData(visits: Visit[], labels: string[]): LineChartData[] {
    const format = 'ddd MMM D';

    // Map visits to their start dates
    const visitsByDate = new Map<string, Visit[]>();
    visits.forEach(visit => {
      const date = moment(visit.startedAt).format(format);
      if (!visitsByDate.has(date)) {
        visitsByDate.set(date, []);
      }
      visitsByDate.get(date).push(visit);
    });

    // Construct and return line chart data
    return [{
      data: labels.map(date => visitsByDate.has(date)
        ? visitsByDate.get(date)
          .reduce((total, visit) => total + this.getDuration(visit), 0).toFixed(3)
        : '0'),
      label: 'Hours'
    }];
  };

  /**
   * Returns the duration of a visit in milliseconds.
   * @param {Visit} visit - the visit to calculate the duration for
   * @return {number} - the duration in milliseconds
   */
  private getDuration(visit: Visit): number {
    return visit.endedAt
      ? (visit.endedAt.getTime() - visit.startedAt.getTime()) / 3600000
      : (new Date().getTime() - visit.startedAt.getTime()) / 3600000;
  };
}

/**
 * Interface used
 */
class LineChartData {
  data: any[];
  label: string;
}

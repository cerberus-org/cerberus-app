import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

import { Visit } from '../../../models/index';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.scss'],
})
export class DailyHoursChartComponent implements OnChanges {
  @Input() visits: Visit[];
  data: LineChartData[];
  labels: string[];
  type = 'line';
  options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        bottom: 10,
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visits']) {
      this.labels = this.setupLineChartLabels();
      this.data = this.setupLineChartData(changes['visits'].currentValue, this.labels);
    }
  }

  /**
   * Constructs list of dates that will be used based on latest date, count, unit, and format.
   * @param latest - the latest date that will be used as the rightmost label
   * @param count - the number of previous dates to use as labels
   * @param format - how each date should be displayed (refer to Moment.js formats)
   * @param unit - the unit to use for mapping to dates (refer to Moment.js keys)
   * @return {Array<string>} - the array of chart labels
   */
  setupLineChartLabels(
    latest: Date = new Date(),
    count: number = 7,
    format: string = 'ddd MMM D',
    unit: moment.unitOfTime.DurationConstructor = 'days',
  ): string[] {
    const labels = Array.from(Array(count), (_, index) => {
      const date = moment(latest.getTime());
      date.subtract(index, unit);
      return date.format(format);
    });
    return labels.reverse();
  }

  /**
   * Calculates the total hours for each day used in labels
   * and returns the data used for the lineChart.
   * @param visits - the visits that will be used
   * @param labels - the labels that durations will be totaled for
   * @param format - how each date should be displayed (refer to Moment.js formats)
   * @returns {[{data: number[], label: string}]} - the line chart data
   */
  setupLineChartData(
    visits: Visit[],
    labels: string[],
    format: string = 'ddd MMM D',
  ): LineChartData[] {
    return visits
      ? [{
        data: visits.reduce(
          (data, visit) => {
            const date: string = moment(visit.startedAt).format(format);
            const index: number = labels.indexOf(date);
            if (index > -1) {
              data[index] += this.getDuration(visit);
            }
            return data;
          },
          Array(labels.length).fill(0),
        )
          .map(value => value.toFixed(3)),
        label: 'Hours',
      }]
      : [{ data: [], label: '' }];
  }

  /**
   * Returns the duration of a visit in milliseconds.
   * @param {Visit} visit - the visit to calculate the duration for
   * @return {number} - the duration in milliseconds
   */
  private getDuration(visit: Visit): number {
    return visit.endedAt
      ? ((visit.endedAt.getTime() - visit.startedAt.getTime()) / 3600000)
      : ((new Date().getTime() - visit.startedAt.getTime()) / 3600000);
  }
}

/**
 * Used for chart.js line chart data.
 */
export class LineChartData {
  data: string[];
  label: string;
}

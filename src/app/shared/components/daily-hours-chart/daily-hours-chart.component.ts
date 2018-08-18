import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Site, Visit } from '../../models';

@Component({
  selector: 'app-daily-hours-chart',
  templateUrl: './daily-hours-chart.component.html',
  styleUrls: ['./daily-hours-chart.component.scss'],
})
export class DailyHoursChartComponent implements OnChanges {
  @Input() visits: Visit[];
  @Input() sites: Site[];
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
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  /**
   * Create map of sites, set labels and data set when data bound properties change.
   *
   * Note: If data is initialized to [{ data: [], label: '' }], once visits and sites are received only the first site is
   * displayed. Therefore, do not show chart if data is null.
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.data = [];
    const mapOfSites = this.sites ? new Map(
        this.sites.map<[string, string]>((site: Site) => [site.id, site.name]),
      ) : new Map();
    this.labels = this.setupLineChartLabels();
    this.getDataSetsBySite(this.visits).forEach((dataSet: Visit[]) => {
      this.data.push(this.setupLineChartDataForDataSet(dataSet, this.labels, mapOfSites));
    });
    this.data = !this.data.length ? null : this.data;
  }

  /**
   * Return an array of Visit arrays separated by site.
   * i.e. [ [ {visit: 1, site: a}, {visit: 2, site: a}], [{visit: 3, site: b}], [{visit: 4, site: c}] ]
   * Time Complexity: O(n)
   *
   * @param {Visit[]} visits
   * @returns {Visit[][]}
   */
  getDataSetsBySite(visits: Visit[]): Visit[][] {
    const mapOfVisits = new Map<string, Visit[]>();
    if (visits && visits.length) {
      visits.forEach((visit: Visit) => {
        visit.siteId = visit.siteId !== null ? visit.siteId : 'noSite';
        if (mapOfVisits.get(visit.siteId)) {
          const visits = mapOfVisits.get(visit.siteId);
          visits.push(visit);
          mapOfVisits.set(visit.siteId, visits);
        } else {
          mapOfVisits.set(visit.siteId, [visit]);
        }
      });
      return Array.from(mapOfVisits.values());
    }
    return [];
  }

  displayChart(visits: Visit[], sites: Site[], data: LineChartData[]): boolean {
    return visits && sites && data ? true : false;
  }

  /**
   * Constructs list of dates that will be used based on latest date, count, unit, and format.
   *
   * @param latest - the latest date that will be used as the rightmost name
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
   * Calculates the total hours for reach day used in labels
   * and returns teh data used for the lineChart.
   *
   * @param {Visit[]} visits
   * @param {string[]} labels
   * @param {Map<string, string>} mapOfSites
   * @param {string} format
   * @returns {LineChartData}
   */
  setupLineChartDataForDataSet(
    visits: Visit[],
    labels: string[],
    mapOfSites: Map<string, string>,
    format: string = 'ddd MMM D',
  ): LineChartData {
    return visits && visits.length
      ? {
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
        label: visits[0].siteId === 'noSite' ? '(No site listed)' + ' Hours' : mapOfSites.get(visits[0].siteId) + ' Hours',
      }
      : { data: [], label: '' };
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

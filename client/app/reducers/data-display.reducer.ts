import { Visit } from '../models/visit';
import * as DataDisplayActions from '../actions/data-display.actions'
import * as moment from 'moment';

export interface State {
  visits: Visit[],
  lineChartLabels: string[];
  lineChartData: { data: string[], label: string }[];
}

export const initialState: State = {
  visits: [],
  lineChartLabels: [],
  lineChartData: []
};

export type Action = DataDisplayActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case DataDisplayActions.LOAD_DATA_SUCCESS: {
      const visits = action.payload;
      const labels = setupLineChartLabels();
      const data = setupLineChartData(visits, labels);
      return Object.assign({}, initialState, {
        visits: visits,
        lineChartLabels: labels,
        lineChartData: data
      });
    }

    default: {
      return state;
    }
  }
}

/**
 * Constructs line chart labels based on latest date, count, unit, and format.
 * @return {Array<string>} - the array of chart labels
 */
const setupLineChartLabels = () => {
  // The latest date that will be used as the rightmost label
  const latest: Date = new Date();
  // The number of previous dates to use as labels, defaults to 7 for week view
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
const setupLineChartData = (visits, labels) => {
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

  console.log(visitsByDate);

  // Construct and return line chart data
  return [{
    data: labels.map(date => visitsByDate.has(date)
      ? visitsByDate.get(date)
        .reduce((total, visit) => total + getDuration(visit), 0).toFixed(3)
      : '0'),
    label: 'Hours'
  }];
};

/**
 * Returns the duration of a visit in milliseconds.
 * @param {Visit} visit - the visit to calculate the duration for
 * @return {number} - the duration in milliseconds
 */
const getDuration = (visit: Visit): number => {
  return visit.endedAt
    ? (visit.endedAt.getTime() - visit.startedAt.getTime()) / 3600000
    : (new Date().getTime() - visit.startedAt.getTime()) / 3600000;
};

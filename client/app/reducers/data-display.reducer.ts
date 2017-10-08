import { Visit } from '../models/visit';
import * as DataDisplayActions from '../actions/data-display.actions'
import * as moment from 'moment';

export interface State {
  lineChartData: { data: string[], label: string }[];
  lineChartLabels: string[];
}

export const initialState: State = {
  lineChartData: [],
  lineChartLabels: []
};

export type Action = DataDisplayActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    /**
     * Maps visits from payload to dates and sets up data for the line chart.
     * action.payload:
     * visits - the visits that will be used
     * latest - the latest date that will be used as the rightmost label
     * count - the number of previous dates to use as labels, defaults to 7 for week view
     * format - how each date should be displayed (refer to Moment.js formats)
     * unit - the unit to use for mapping to dates (refer to Moment.js keys)
     */
    case DataDisplayActions.SETUP_LINE_CHART: {
      const visits: Visit[] = action.payload.visits;
      const latest: Date = action.payload.latest || new Date();
      const count: number = action.payload.count || 7;
      const format: string = action.payload.format || 'ddd MMM D';
      const unit: moment.unitOfTime.DurationConstructor = action.payload.unit || 'days';

      // Construct line chart labels based on provided latest date, count, unit, and format
      const labels = Array.from(Array(count), (_, i) => {
        const date = moment(latest.getTime());
        date.subtract(i, unit);
        return date.format(format);
      });
      labels.reverse();

      // Map visits to dates
      const visitsByDate = new Map<string, Visit[]>();
      visits.forEach(visit => {
        const date = moment(visit.startedAt).format(format);
        if (!visitsByDate.has(date)) {
          visitsByDate.set(date, []);
        }
        visitsByDate.get(date).push(visit);
      });

      console.log(visitsByDate);

      // Construct line chart data
      const data = [{
        data: labels.map(date => visitsByDate.has(date)
          ? visitsByDate.get(date)
            .reduce((total, visit) => total + getDuration(visit), 0).toFixed(3)
          : '0'),
        label: 'Hours'
      }];

      return {
        lineChartData: data,
        lineChartLabels: labels
      };
    }

    default: {
      return state;
    }
  }
}

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

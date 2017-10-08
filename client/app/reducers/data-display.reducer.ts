import { Visit } from '../models/visit';
import * as DataDisplayActions from '../actions/data-display.actions'
import * as moment from 'moment';

export interface State {
  lineChartData: { data: number[], label: string }[];
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
     */
    case DataDisplayActions.SETUP_LINE_CHART: {
      const visits: Visit[] = action.payload.visits;
      const latest: Date = action.payload.latest || new Date();
      const count: number = action.payload.count || 7;

      // Construct line chart labels based on provided date and count
      const labels = Array.from(Array(count), (_, i) => {
        const date = new Date(latest.getTime());
        date.setDate(date.getDate() - i);
        return date.toDateString();
      });
      labels.reverse();

      // Map visits to dates
      const visitsByDate = new Map<string, Visit[]>();
      visits.forEach(visit => {
        if (visit.endedAt) {
          const date = visit.startedAt.toDateString();
          if (!visitsByDate.has(date)) {
            visitsByDate.set(date, []);
          }
          visitsByDate.get(date).push(visit);
        }
      });

      // Construct line chart data
      const data = [{
        data: labels.map(date => visitsByDate.has(date)
          ? Math.floor(visitsByDate.get(date)
            .reduce((total, visit) => total + getDuration(visit), 0))
          : 0),
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
  const start = moment(visit.startedAt);
  const end = moment(visit.endedAt);
  return moment.duration(end.diff(start)).milliseconds() / 3600000;
};

import { Visit } from '../models/visit';
import * as DataDisplayActions from '../actions/data-display.actions'

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
     * action.payload - the visits that will be used
     */
    case DataDisplayActions.SETUP_LINE_CHART: {
      const visits = action.payload;

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

      // Construct line chart labels
      const labels = Array.from(Array(7), (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toDateString();
      });
      labels.reverse();

      // Construct line chart data
      const data = [{
        data: labels.map(date => visitsByDate.has(date)
          ? Math.floor(visitsByDate.get(date)
            .reduce((total, visit) => total + getDuration(visit), 0) / 3600000)
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
 */
const getDuration = (visit: Visit): number => {
  return visit.endedAt.getTime() - visit.startedAt.getTime();
};

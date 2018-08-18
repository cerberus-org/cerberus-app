import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getVolunteersForSelectedTeam } from '../../../core/selectors/volunteers.selectors';
import { Volunteer } from '../../../shared/models';
import { GenerateReport } from '../../actions/settings.actions';
import { Report } from '../../models/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  validReport: Report;
  volunteers$: Observable<Volunteer[]>;

  constructor(public store$: Store<AppState>) {
    this.volunteers$ = store$.pipe(select(getVolunteersForSelectedTeam));
  }

  /**
   * Handles validReport events by setting validReport.
   * @param {Report} report
   */
  onValidReport(report: Report) {
    this.validReport = report;
  }

  /**
   * Handles submission of report form by dispatching appropriate report generation action.
   */
  onSubmitReport() {
    if (this.validReport.title === 'Visit History') {
      this.store$.dispatch(new GenerateReport({
        startedAt: this.validReport.startedAt,
        endedAt: this.validReport.endedAt,
      }));
    }
  }

}

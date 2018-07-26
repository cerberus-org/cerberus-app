import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { selectModelVolunteers } from '../../../core/selectors/model.selectors';
import { Report, Volunteer } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  validReport: Report;
  volunteers$: Observable<Volunteer[]> = this.store$.pipe(select(selectModelVolunteers));

  constructor(public store$: Store<AppState>) { }

  ngOnInit(): void {
    this.volunteers$ = this.store$.pipe(select(selectModelVolunteers));
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
      this.store$.dispatch(new SettingsActions.GenerateVisitHistoryReport({
        startedAt: this.validReport.startedAt,
        endedAt: this.validReport.endedAt,
      }));
    }
  }

}

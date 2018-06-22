import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectSessionOrganization, selectSessionReducerState } from '../../../auth/store/selectors/session.selectors';
import { Organization, Report, Volunteer } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  private modelSubscription: Subscription;
  validReport: any;
  currentOrganization: Organization;
  volunteers: Volunteer[];

  constructor(public store$: Store<RootState>) { }

  ngOnInit() {
    this.modelSubscription = this.store$.select('model')
      .subscribe((state) => {
        this.volunteers = state.volunteers;
      });
  }

  ngOnDestroy(): void {
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
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
        volunteers: this.volunteers,
      }));
    }
  }

}

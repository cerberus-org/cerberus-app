import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getSessionState } from '../../../auth/store/selectors/session.selectors';
import { Organization, Report, Volunteer } from '../../../models';
import { State } from '../../../root/store/reducers/index';
import * as SettingsActions from '../../store/settings.actions';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  validReport: any;
  private sessionSubscription: Subscription;
  currentOrganization: Organization;
  private modelSubscription: Subscription;
  volunteers: Volunteer[];

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.sessionSubscription = this.store.pipe(select(getSessionState))
      .subscribe((state) => {
        this.currentOrganization = state.organization;
      });
    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        this.volunteers = state.volunteers;
      });
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
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
      this.store.dispatch(new SettingsActions.GenerateVisitHistoryReport({
        startedAt: this.validReport.startedAt,
        endedAt: this.validReport.endedAt,
        organizationId: this.currentOrganization.id,
        volunteers: this.volunteers,
      }));
    }
  }

}

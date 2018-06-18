import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import * as SettingsActions from '../../../actions/settings.actions';
import { Organization, Report, Volunteer } from '../../../models';
import { State } from '../../../reducers';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  validReport: any;
  private authSubscription: Subscription;
  currentOrganization: Organization;
  private modelSubscription: Subscription;
  volunteers: Volunteer[];

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.authSubscription = this.store.select('auth')
      .subscribe((state) => {
        this.currentOrganization = state.organization;
      });
    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        this.volunteers = state.volunteers;
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
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

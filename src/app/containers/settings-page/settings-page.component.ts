import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as jsPDF from 'jspdf';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import * as AppActions from '../../actions/app.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { HeaderOptions } from '../../models/header-options';
import { Organization } from '../../models/organization';
import { SidenavOptions } from '../../models/sidenav-options';
import { User } from '../../models/user';
import { Visit } from '../../models/visit';
import { State } from '../../reducers';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  appSubscription: Subscription;
  settingsSubscription: Subscription;
  sidenavSelection: string;
  validReport: any;
  visits: Visit[];

  userFormTitle: string;
  // User entered in form
  validUser: User;
  // Initial user used to pre populate form
  initialUser: User;

  organizationFormTitle: string;
  validOrganization: Organization;
  initialOrganization: Organization;

  constructor(private store: Store<State>) {
    this.userFormTitle = 'Update user data.';
    this.organizationFormTitle = 'Update organization data.';
  }

  ngOnInit() {
    this.store.dispatch(new AppActions.SetHeaderOptions(
      new HeaderOptions(
        'Settings',
        'settings',
        '/dashboard',
        false,
      )
    ));
    this.store.dispatch(new AppActions.SetSidenavOptions([
      new SidenavOptions('User', 'face', new SettingsActions.SetSidenavSelection('User')),
      new SidenavOptions('Organization', 'domain', new SettingsActions.SetSidenavSelection('Organization')),
      new SidenavOptions('Reports', 'assessment', new SettingsActions.SetSidenavSelection('Reports'))
    ]));
    this.subscribeToSettings();
    this.subscribeToApp();
  }

  subscribeToApp() {
    // If user or organization changes, set
    this.appSubscription = this.store
      .select('app')
      .map(state => {
        return {
          user: state.user,
          organization: state.organization,
        }
      })
      .distinctUntilChanged((a, b) => _.isEqual(a, b))
      .subscribe(state => {
        this.initialUser = state.user;
        this.initialOrganization = state.organization;
      });
  }

  subscribeToSettings() {
    // If sidenavSelection changes, set
    this.settingsSubscription = this.store
      .select('settings')
      .map(state => state.sidenavSelection)
      .distinctUntilChanged((a, b) => _.isEqual(a, b))
      .subscribe(sidenavSelection => {
        this.sidenavSelection = sidenavSelection;
      });
    // If visits[] changes generate report and set
    this.settingsSubscription = this.store
      .select('settings')
      .map(state => state.visits)
      .distinctUntilChanged((a, b) => _.isEqual(a, b))
      .subscribe(visits => {
        this.visits = visits;
        this.generateReport();
      });
  }

  /**
   * Once the user-form emits an event,
   * set user.
   * @param $event
   */
  setUser($event) {
    this.validUser = $event;
  }

  /**
   * Once the organization-form emits an event,
   * set organization.
   * @param $event
   */
  setOrganization($event) {
    this.validOrganization = $event;
  }

  /**
   * Once the report-form emits an event,
   * set report.
   * @param $event
   */
  setReport($event) {
    this.validReport = $event;
  }

  onUserFormSubmit() {
    this.store.dispatch(new SettingsActions.UpdateUser(
      Object.assign({}, this.validUser, { id: this.initialUser.id })
    ));
  }

  onOrganizationFormSubmit() {
    this.store.dispatch(new SettingsActions.UpdateOrganization(
      Object.assign({}, this.validOrganization, { id: this.initialOrganization.id })
    ));
  }

  onReportSubmit() {
    this.store.dispatch(new SettingsActions.LoadVisitsByDates(
      { startedAt: this.validReport.startedAt, endedAt: this.validReport.endedAt }
    ));
  }

  generateReport() {
    if (this.visits) {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text(15, 20, 'There are ' + this.visits.length + ' visits between ');
      doc.text(15, 30, this.validReport.startedAt + ' and ');
      doc.text(15, 40, this.validReport.endedAt + '');
      doc.save(this.validReport.title + '.pdf');
    }
  }

  ngOnDestroy(): void {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }
}

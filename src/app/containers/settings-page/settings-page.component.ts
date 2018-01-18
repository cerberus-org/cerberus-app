import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import * as AppActions from '../../actions/app.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { HeaderOptions } from '../../models/header-options';
import { Organization } from '../../models/organization';
import { SidenavOptions } from '../../models/sidenav-options';
import { User } from '../../models/user';
import { State } from '../../reducers';
const jsPDF = require('jspdf');

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
    this.settingsSubscription = this.store
      .select('settings')
      .subscribe(state => {
        this.sidenavSelection = state.sidenavSelection;
    });
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
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(20, 20, 'This is a title');

    doc.setFontSize(16);
    doc.text(20, 30, 'This is some normal sized text underneath.');
    doc.save('test.pdf')
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

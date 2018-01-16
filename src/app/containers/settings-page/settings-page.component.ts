import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';
import * as AppActions from '../../actions/app.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { ColumnOptions } from '../../models/column-options';
import { HeaderOptions } from '../../models/header-options';
import { Organization } from '../../models/organization';
import { SidenavOptions } from '../../models/sidenav-options';
import { User } from '../../models/user';
import { Volunteer } from '../../models/volunteer';
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

  userFormTitle: string;
  // User entered in form
  validUser: User;
  // Initial user used to pre populate form
  initialUser: User;

  organizationFormTitle: string;
  validOrganization: Organization;
  initialOrganization: Organization;

  volunteers$: Observable<Volunteer[]>;
  volunteerTableOptions: ColumnOptions[];

  constructor(private store: Store<State>) {
    this.userFormTitle = 'Update user data.';
    this.organizationFormTitle = 'Update organization data.';
  }

  ngOnInit() {
    this.volunteerTableOptions = [
      new ColumnOptions(
        'firstName',
        'First Name',
        (row: Volunteer) => row.firstName
      ),
      new ColumnOptions(
        'lastName',
        'Last Name',
        (row: Volunteer) => row.lastName
      ),
      new ColumnOptions(
        'petName',
        'Pet Name',
        (row: Volunteer) => row.petName
      )
    ];
    // Dispatch setup actions
    this.store.dispatch(new AppActions.SetHeaderOptions(
      new HeaderOptions(
        'Settings',
        'settings',
        '/dashboard',
        false,
      )
    ));
    this.store.dispatch(new AppActions.SetSidenavOptions([
      new SidenavOptions(
        'User',
        'face',
        new SettingsActions.LoadPage('user')
      ),
      new SidenavOptions(
        'Organization',
        'domain',
        new SettingsActions.LoadPage('organization')
      ),
      new SidenavOptions(
        'Volunteers',
        'insert_emoticon',
        new SettingsActions.LoadVolunteersPage(organizationId)
      ),
      new SidenavOptions(
        'Reports',
        'assessment',
        new SettingsActions.LoadPage('Reports')
      )
    ]));
    // Setup subscriptions
    const settings$ = this.store.select('settings');
    this.settingsSubscription = settings$.subscribe(state => {
      this.sidenavSelection = state.sidenavSelection;
    });
    this.volunteers$ = settings$.map(state => state.volunteers);
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
   * Handles setUser events by setting validUser..
   * @param user - a valid user when valid, null when invalid
   */
  onSetUser(user: User) {
    this.validUser = user;
  }

  /**
   * Handles setOrganization events by setting validOrganization.
   * @param organization - a valid organization when valid, null when invalid
   */
  onValidOrganization(organization: Organization) {
    this.validOrganization = organization;
  }

  /**
   * Handles submission of user form by dispatching an UpdateUser action.
   */
  onSubmitUser() {
    this.store.dispatch(new SettingsActions.UpdateUser(this.validUser));
  }

  /**
   * Handles submission of organization form by dispatching an UpdateOrganization action.
   */
  onSubmitOrganization() {
    this.store.dispatch(new SettingsActions.UpdateOrganization(this.validOrganization));
  }

  /**
   * Handles deleteVolunteer events by dispatching a DeleteVolunteer action.
   * @param volunteer - the volunteer to be deleted
   */
  onDeleteVolunteer(volunteer: Volunteer) {
    console.log('Delete');
  }

  setReport($event) {
    this.validReport = $event;
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

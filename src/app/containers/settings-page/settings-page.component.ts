import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';

import * as AppActions from '../../actions/app.actions';
import * as SettingsActions from '../../actions/settings.actions';
import {canSelectRole, formatDate, formatTime, getRoleOptions, isAdmin, isLastOwner} from '../../functions';
import { ColumnOptions, HeaderOptions, Organization, Report, SidenavOptions, User, Visit, Volunteer } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Settings',
    'settings',
    '/dashboard',
    false,
  );
  private authSubscription: Subscription;
  private modelSubscription: Subscription;
  private settingsSubscription: Subscription;

  organizationFormTitle: string;
  userFormTitle: string;
  userTableOptions: ColumnOptions[] = [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: User) => row.firstName,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: User) => row.lastName,
    ),
    new ColumnOptions(
      'role',
      'Role',
      (row: User) => row.role,
      (row: User) => (
        canSelectRole(this.currentUserFromModel, row) && !isLastOwner(row, this.users)
          ? getRoleOptions(this.currentUserFromModel, row)
          : null
      ),
    ),
  ];
  volunteerTableOptions: ColumnOptions[] = [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: Volunteer) => row.firstName,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: Volunteer) => row.lastName,
    ),
    new ColumnOptions(
      'petName',
      'Pet Name',
      (row: Volunteer) => row.petName,
    ),
  ];
  visitTableOptions: ColumnOptions[] = [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: Visit) => row.id,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: Visit) => row.id,
    ),
    new ColumnOptions(
      'startedAt',
      'Start',
      (row: Visit) => formatDate(row.startedAt, row.timezone),
    ),
    {
      columnDef: 'endedAt',
      header: 'End',
      cell: (row: Visit) => row.endedAt,
      timePicker: true,
    },
  ];

  users$: Observable<User[]>;
  volunteers$: Observable<Volunteer[]>;
  visits$: Observable<Visit[]>;
  currentOrganization: Organization;
  currentUser: User;
  currentUserFromModel: User; // Used for user table
  users: User[];
  volunteers: Volunteer[];
  visits: Visit[];
  sidenavSelection: string;

  organizationChanges: Organization;
  userChanges: User;
  validReport: any;

  constructor(public store: Store<State>) {
    this.userFormTitle = 'Update your user info.';
    this.organizationFormTitle = 'Update your organization info.';
  }

  ngOnInit() {
    this.store.dispatch(new SettingsActions.LoadPage('user'));

    this.authSubscription = this.store.select('auth')
      .subscribe((state) => {
        this.currentUser = state.user;
        this.currentOrganization = state.organization;
        if (this.currentUser) {
          this.store.dispatch(new AppActions.SetSidenavOptions(
            this.getSidenavOptions(this.currentUser),
          ));
        }
      });

    const model$ = this.store.select('model');
    this.users$ = model$.pipe(map(state => state.users));
    this.volunteers$ = model$.pipe(map(state => state.volunteers));
    this.visits$ = model$.pipe(map(state => state.visits));
    this.modelSubscription = model$
      .subscribe((state) => {
        this.currentUserFromModel = state.users
          .find(user => user.id === this.currentUser.id);
        this.users = state.users;
        this.volunteers = state.volunteers;
        this.visits = state.visits;
      });

    this.settingsSubscription = this.store.select('settings')
      .subscribe((state) => {
        this.sidenavSelection = state.sidenavSelection;
      });

    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  /**
   * Creates the array of sidenav options based on user role.
   * @param user - the current user
   * @returns {SidenavOptions[]} the sidenav options to display
   */
  private getSidenavOptions(user: User): SidenavOptions[] {
    const sidenavOptions = [
      new SidenavOptions(
        'User',
        'face',
        new SettingsActions.LoadPage('user'),
      ),
    ];
    if (isAdmin(user)) {
      sidenavOptions.push(
        new SidenavOptions(
          'Organization',
          'domain',
          new SettingsActions.LoadPage('organization'),
        ),
        new SidenavOptions(
          'Volunteers',
          'insert_emoticon',
          new SettingsActions.LoadPage('volunteers'),
        ),
        new SidenavOptions(
          'Reports',
          'assessment',
          new SettingsActions.LoadPage('reports'),
        ),
        new SidenavOptions(
          'Roles',
          'lock_outline',
          new SettingsActions.LoadPage('roles'),
        ),
        new SidenavOptions(
          'Visits',
          'done_all',
          new SettingsActions.LoadPage('visits'),
        ),
      );
    }
    return sidenavOptions;
  }

  /**
   * Handles userChanges events by setting userChanges.
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.userChanges = user;
  }

  /**
   * Handles organizationChanges events by setting organizationChanges.
   * @param organization - a valid organization when valid, null when invalid
   */
  onValidOrganization(organization: Organization) {
    this.organizationChanges = organization;
  }

  /**
   * Handles validReport events by setting validReport.
   * @param {Report} report
   */
  onValidReport(report: Report) {
    this.validReport = report;
  }

  /**
   * Handles submission of user form by dispatching an UpdateUser action.
   */
  onSubmitUser(user: User) {
    this.store.dispatch(new SettingsActions.UpdateUser(
      Object.assign({}, this.currentUser, user),
    ));
  }

  /**
   * Handles submission of organization form by dispatching an UpdateOrganization action.
   */
  onSubmitOrganization(organization: Organization) {
    this.store.dispatch(new SettingsActions.UpdateOrganization(
      Object.assign({}, this.currentOrganization, organization),
    ));
  }

  /**
   * Handles deleteVolunteer events by dispatching a DeleteVolunteer action.
   * @param volunteer - the volunteer to be deleted
   */
  onDeleteVolunteer(volunteer: Volunteer) {
    this.store.dispatch(new SettingsActions.DeleteVolunteer(volunteer));
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

  onUpdateUser(user: User) {
    this.store.dispatch(
      user.id === this.currentUser.id
        ? new SettingsActions.UpdateUser(user)
        : new SettingsActions.UpdateRole(user),
    );
  }

  onUpdateVisits(visits: Visit[]) {
    console.log(visits);
    this.store.dispatch(new SettingsActions.UpdateVisits(visits));
  }

  onDeleteUser(user: User) {
    console.log('Not yet implemented');
  }
}

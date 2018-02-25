import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as AppActions from '../../actions/app.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { ColumnOptions } from '../../models/column-options';
import { HeaderOptions } from '../../models/header-options';
import { Organization } from '../../models/organization';
import { Report } from '../../models/report';
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
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Settings',
    'settings',
    '/dashboard',
    false,
  );
  private sidenavOptions: SidenavOptions[] = [
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
      new SettingsActions.LoadPage('volunteers')
    ),
    new SidenavOptions(
      'Reports',
      'assessment',
      new SettingsActions.LoadPage('reports')
    )
  ];
  private appSubscription: Subscription;
  private settingsSubscription: Subscription;
  private volunteersSubscription: Subscription;

  organizationFormTitle: string;
  userFormTitle: string;
  volunteerTableOptions: ColumnOptions[] = [
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

  initialOrganization: Organization;
  initialUser: User;
  volunteers$: Observable<Volunteer[]>;
  volunteers: Volunteer[];
  sidenavSelection: string;

  validReport: any;
  validOrganization: Organization;
  validUser: User;

  constructor(public store: Store<State>) {
    this.userFormTitle = 'Update your user info.';
    this.organizationFormTitle = 'Update your organization info.';
  }

  ngOnInit() {
    this.appSubscription = this.store.select('auth')
      .subscribe(state => {
        this.initialUser = state.user;
        this.initialOrganization = state.organization;
      });

    this.volunteers$ = this.store.select('model')
      .map(state => state.volunteers);
    this.volunteersSubscription = this.volunteers$
      .subscribe(volunteers => this.volunteers = volunteers);

    this.settingsSubscription = this.store.select('settings')
      .subscribe(state => {
        this.sidenavSelection = state.sidenavSelection;
      });

    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
    this.store.dispatch(new AppActions.SetSidenavOptions(this.sidenavOptions));
  }

  /**
   * Handles validUser events by setting validUser.
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.validUser = user;
  }

  /**
   * Handles validOrganization events by setting validOrganization.
   * @param organization - a valid organization when valid, null when invalid
   */
  onValidOrganization(organization: Organization) {
    this.validOrganization = organization;
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
  onSubmitUser(user: User, id: string) {
    this.store.dispatch(new SettingsActions.UpdateUser(
      Object.assign({}, user, { id })
    ));
  }

  /**
   * Handles submission of organization form by dispatching an UpdateOrganization action.
   */
  onSubmitOrganization(organization: Organization, id: string) {
    this.store.dispatch(new SettingsActions.UpdateOrganization(
      Object.assign({}, organization, { id })
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
        organizationId: this.initialOrganization.id,
        volunteers: this.volunteers,
      }));
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

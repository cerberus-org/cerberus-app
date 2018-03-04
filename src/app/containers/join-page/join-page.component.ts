import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as AppActions from '../../actions/app.actions';
import * as RouterActions from '../../actions/router.actions';

import { HeaderOptions, Organization, User } from '../../models';
import { State } from '../../reducers';
import { AuthService, ErrorService, OrganizationService, SnackBarService } from '../../services';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
})
export class JoinPageComponent implements OnInit {

  private headerOptions: HeaderOptions = new HeaderOptions(
    'Cerberus',
    'group_work',
    null,
    false,
  );

  validUser: User;
  userFormTitle: string;

  filteredOrganizations: Organization[];
  organizations: Organization[];

  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

  constructor(private authService: AuthService,
              private organizationService: OrganizationService,
              private errorService: ErrorService,
              private store: Store<State>,
              private snackBarService: SnackBarService) {
    this.userFormTitle = 'Please enter your information.';
  }

  ngOnInit() {
    this.organizationService.getAll(true)
      .map((organizations: Organization[]) => {
        this.organizations = organizations;
      },
           (error: any) => {
             this.errorService.handleFirebaseError(error);
           }).subscribe();
    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  /**
   * Handles userChanges events by setting userChanges.
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.validUser = user;
  }

  /**
   * On submit, create user, log user out and display snack bar on success.
   * @param {string} organizationName
   */
  onJoinOrganization(organizationName: string) {
    const organization = this.getOrganizationByName(organizationName);
    if (organization) {
      this.authService.createUser(
        Object.assign({}, this.validUser, { organizationId: organization.id, role: 'unverified' }))
        .subscribe(() => {
          this.authService.signOut();
          this.snackBarService.requestToJoinOrganizationSuccess();
          this.store.dispatch(new RouterActions.Go({ path: ['/login'] }));
        });
    } else {
      this.snackBarService.invalidOrganization();
    }
  }

  /**
   * Return Organization given name.
   * @param {string} organizationName
   * @returns {Organization}
   */
  getOrganizationByName(organizationName: string): Organization {
    return this.organizations.find((organization: Organization) => {
      return organization.name === organizationName;
    });
  }

  /**
   * Watch for changes in the organizationName input. Set filteredOrganizations on change.
   * @param {Organization[]} organizations
   * @param {string} input
   */
  onOrganizationInputNameChanges(organizations: Organization[], input: string) {
    this.filteredOrganizations = this.filterOrganizationsByName(organizations, input);
  }

  /**
   * Return the organizations that are equal to name or are a subset of name.
   * @param {Organization[]} organizations
   * @param {string} name
   * @returns {Organization[]}
   */
  filterOrganizationsByName(organizations: Organization[], name: string): Organization[] {
    const nameLowerCase = name.toLowerCase();
    return organizations
      .filter(organization => organization.name.toLowerCase().includes(nameLowerCase));
  }
}

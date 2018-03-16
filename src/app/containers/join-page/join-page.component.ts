import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

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
    '/home',
    false,
  );

  validInput: string;
  validUser: User;
  userFormTitle: string;
  organizations: Organization[];
  modelSubscription: Subscription;

  constructor(private authService: AuthService,
              private organizationService: OrganizationService,
              private errorService: ErrorService,
              private store: Store<State>,
              private snackBarService: SnackBarService) {
    this.userFormTitle = 'Please enter your information.';
  }

  ngOnInit() {
    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        if (state.organizations) {
          this.organizations = state.organizations;
        }
      });
    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  /**
   * Handles validUser events by setting validUser.
   *
   * @param user - a valid user when valid, null when invalid
   */
  onValidUser(user: User) {
    this.validUser = user;
  }

  /**
   * Handles validInput events by setting validInput.
   *
   * @param {string} organizationName
   */
  onValidInput(organizationName: string) {
    this.validInput = organizationName;
  }

  /**
   * Return Organization given name.
   *
   * @param {string} organizationName
   * @returns {Organization}
   */
  getOrganizationByName(organizationName: string): Organization {
    return this.organizations.find((organization: Organization) => {
      return organization.name === organizationName;
    });
  }

  /**
   * On submit, validate organization, create user, log user out and display snack bar on success.
   *
   * @param {string} organizationName
   */
  onJoinOrganization() {
    const organization = this.getOrganizationByName(this.validInput);
    if (organization) {
      this.authService.createUser(
        Object.assign({}, this.validUser, { organizationId: organization.id, role: 'unverified' }))
        .subscribe(() => {
          this.authService.signOut();
          this.snackBarService.requestToJoinOrganizationSuccess();
          this.store.dispatch(new RouterActions.Go({ path: ['/home'] }));
        });
    } else {
      this.snackBarService.invalidOrganization();
    }
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Site } from '../../models/site';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';
import { SiteService } from '../../services/site.service';
import { OrganizationService } from '../../services/organization.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { UserService } from '../../services/user.service';
import { State } from '../../reducers/index';
import * as GettingStartedActions from '../../actions/getting-started.actions';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  gettingStartedSubscription: Subscription;
  step: number;
  validOrganization: Organization;
  validUser: User;

  constructor(private siteService: SiteService,
              private organizationService: OrganizationService,
              private snackBarService: SnackBarService,
              private userService: UserService,
              private store: Store<State>) { }

  ngOnInit() {
    this.gettingStartedSubscription = this.subscribeToGettingStarted();
  }

  ngOnDestroy() {
    this.gettingStartedSubscription.unsubscribe();
  }

  subscribeToGettingStarted(): Subscription {
    return this.store.select('gettingStarted').subscribe(state => {
      this.tabGroup.selectedIndex = state.selectedIndex;
      this.step = state.step;
      this.validOrganization = state.validOrganization;
      this.validUser = state.validUser;
    });
  }

  onNext(step): void {
    this.store.dispatch(new GettingStartedActions.NextStep(step));
  };

  /**
   * On submit, add the following in order: Organization, Site, then User.
   */
  onSubmit(): void {
    // TODO: Refactor with @ngrx/effects
    this.createOrganization(this.validOrganization).subscribe(organization => {
      const userWithOrgId = Object.assign({}, this.validUser);
      userWithOrgId.organizationId = organization._id;
      this.createSite(organization).subscribe(() => {
        this.createUser(userWithOrgId).subscribe(() => {
          this.snackBarService.addOrganizationSuccess();
          this.login(this.validUser);
        });
      });
    });
  };

  /**
   * Creates an Organization and executes a function on success.
   * @param {Organization} organization
   */
  createOrganization(organization: Organization): Observable<Organization> {
    return this.organizationService.create(organization);
  }

  /**
   * Creates a Site and executes a function on success.
   * @param {Organization} organization
   */
  createSite(organization: Organization): Observable<Site> {
    // TODO: Get values from a new site form
    return this.siteService.create(new Site(organization._id, organization.name, null));
  }

  /**
   * Creates a User and executes a function on success.
   * @param user
   */
  createUser(user: User): Observable<User> {
    return this.userService.create(user);
  }

  /**
   * Logs the user in.
   * @param {User} user
   */
  login(user: User) {
    this.userService.login(user, () => this.snackBarService.welcome(user.firstName));
  }
}

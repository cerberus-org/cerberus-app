import { Component, OnInit, ViewChild } from '@angular/core';
import { MdTabGroup } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Site } from '../../models/site';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';
import { SiteService } from '../../services/site.service';
import { OrganizationService } from '../../services/organization.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { UserService } from '../../services/user.service';
import { State } from '../../reducers/index';
import { Store } from '@ngrx/store';
import * as GettingStartedActions from '../../actions/getting-started.actions';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MdTabGroup;
  error: string;
  gettingStarted$: Observable<State['gettingStarted']>
  step: number;
  validOrganization: boolean;
  validUser: boolean;
  organization: Organization;
  user: User;

  constructor(private siteService: SiteService,
              private organizationService: OrganizationService,
              private snackBarService: SnackBarService,
              private userService: UserService,
              private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new GettingStartedActions.LoadTabGroup(this.tabGroup));
    this.gettingStarted$ = this.store.select('gettingStarted');
  }

  onNext(step): void {
    this.store.dispatch(new GettingStartedActions.NextStep(step));
  };

  /**
   * On submit, add the following in order: Organization, Site, then User.
   */
  onSubmit(): void {
    // TODO: Refactor with @ngrx/effects
    this.createOrganization(this.organization).subscribe(organization => {
      const userWithOrgId = Object.assign({}, this.user);
      userWithOrgId.organizationId = organization._id;
      this.createSite(organization).subscribe(() => {
        this.createUser(userWithOrgId).subscribe(() => {
          this.snackBarService.addOrganizationSuccess();
          this.login(this.user);
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

  login(user: User) {
    this.userService.login(user, () => this.snackBarService.welcome(user.firstName));
  }
}

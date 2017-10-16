import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';

import { SnackBarService } from '../services/snack-bar.service';
import { SiteService } from '../services/site.service';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { Site } from '../models/site';
import * as GettingStartedActions from '../actions/getting-started.actions'
import * as LoginActions from '../actions/login.actions'

@Injectable()
export class GettingStartedEffects {

  /**
   * Listen for the Submit action, create the organization, user, and site,
   * then emit the success snack bar and login with the created user.
   */
  @Effect()
  loadData: Observable<Action> = this.actions
    .ofType(GettingStartedActions.SUBMIT)
    .map((action: GettingStartedActions.Submit) => action.payload)
    // Create the organization
    .switchMap(payload => this.organizationService.create(payload.organization)
      .switchMap(createdOrganization => {
        // Use the ID from the created organization for the site and user
        const site = new Site(createdOrganization._id, createdOrganization.name, null);
        const user = Object.assign({}, payload.user, { organizationId: createdOrganization._id });
        return Observable
          // Concurrently create the user and site
          .forkJoin(
            this.siteService.create(site),
            this.userService.create(user))
          .map(() => {
            this.snackBarService.addOrganizationSuccess();
            return new LoginActions.Login(payload.user);
          })
      }));

  constructor(private actions: Actions,
              private organizationService: OrganizationService,
              private siteService: SiteService,
              private snackBarService: SnackBarService,
              private userService: UserService) {}
}

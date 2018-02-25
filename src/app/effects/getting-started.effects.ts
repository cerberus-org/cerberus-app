import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import * as GettingStartedActions from '../actions/getting-started.actions';
import * as LoginActions from '../actions/login.actions';
import { Site } from '../models/site';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';
import { SiteService } from '../services/site.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class GettingStartedEffects {

  /**
   * Listen for the Submit action, create the organization, user, and site,
   * then emit the success snack bar and loginSuccess with the created user.
   */
  @Effect()
  submit$: Observable<Action> = this.actions
    .ofType(GettingStartedActions.SUBMIT)
    .map((action: GettingStartedActions.Submit) => action.payload)
    // Create the organization
    .switchMap(payload => this.organizationService.add(payload.organization)
      .switchMap(createdOrganization => {
        // Use the ID from the created organization for the site and user
        const site = new Site(createdOrganization.id, createdOrganization.name, null);
        const user = Object.assign({}, payload.user, { organizationId: createdOrganization.id, role: 'owner' });
        return Observable
        // Concurrently create the user and site
          .forkJoin(
            this.siteService.add(site),
            this.authService.createUser(user))
          .map(() => {
            this.snackBarService.addOrganizationSuccess();
            return new LoginActions.LogIn(payload.user);
          })
      }));

  constructor(private actions: Actions,
              private authService: AuthService,
              private organizationService: OrganizationService,
              private siteService: SiteService,
              private snackBarService: SnackBarService) {}
}

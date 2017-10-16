import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';

import * as GettingStartedActions from '../actions/getting-started.actions'
import { SnackBarService } from '../services/snack-bar.service';
import { SiteService } from '../services/site.service';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { Site } from '../models/site';

@Injectable()
export class GettingStartedEffects {

  /**
   * Listen for the Submit action, create the organization, user, and site,
   * then emit the success snack bar and login with the created user.
   */
  @Effect({ dispatch: false })
  loadData: Observable<Action> = this.actions
    .ofType(GettingStartedActions.SUBMIT)
    .map((action: GettingStartedActions.Submit) => action.payload)
    .switchMap(payload => this.organizationService.create(payload.organization)
      .switchMap(createdOrganization => {
        const user = Object.assign({}, payload.user, { organizationId: createdOrganization._id });
        const site = new Site(createdOrganization._id, createdOrganization.name, null);
        return Observable
          .forkJoin(
            this.userService.create(user),
            this.siteService.create(site))
          .map(results => null) // Results are not needed
          .do(() => {
            this.snackBarService.addOrganizationSuccess();
            this.userService.login(
              payload.user,
              () => this.snackBarService.welcome(payload.user.firstName)
            );
          })
      }));

  constructor(private actions: Actions,
              private organizationService: OrganizationService,
              private siteService: SiteService,
              private snackBarService: SnackBarService,
              private userService: UserService) {}
}

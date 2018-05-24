import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs/index';
import { map, switchMap } from 'rxjs/operators';

import * as GettingStartedActions from '../actions/getting-started.actions';
import * as LoginActions from '../actions/login.actions';
import { Site } from '../models';
import { AuthService, OrganizationService, SiteService, SnackBarService } from '../services';

@Injectable()
export class GettingStartedEffects {

  /**
   * Listen for the Submit action, create the organization, user, and site,
   * then emit the success snack bar and loginSuccess with the created user.
   */
  @Effect()
  submit$: Observable<Action> = this.actions
    .ofType(GettingStartedActions.SUBMIT)
    .pipe(
      map((action: GettingStartedActions.Submit) => action.payload),
      // Create the organization
      switchMap(payload => this.organizationService.add(payload.organization)
        .pipe(
          switchMap((createdOrganization) => {
            // Use the ID from the created organization for the site and user
            const site = new Site(createdOrganization.id, createdOrganization.name, null);
            const user = Object.assign({}, payload.user, { organizationId: createdOrganization.id, role: 'Owner' });
            return forkJoin(
              this.siteService.add(site),
              this.authService.createUser(user),
            )
              .pipe(
                map(() => {
                  this.snackBarService.addOrganizationSuccess();
                  return new LoginActions.LogIn(payload.user);
                }),
              );
          }),
        )),
    );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private organizationService: OrganizationService,
    private siteService: SiteService,
    private snackBarService: SnackBarService,
  ) {}
}

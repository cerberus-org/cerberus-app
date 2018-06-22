import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { OrganizationService } from '../../../data/services/organization.service';
import { SiteService } from '../../../data/services/site.service';
import { Organization, Site } from '../../../models';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { SignUpState } from '../reducers';
import { selectGettingStartedReducerState } from '../selectors/getting-started.selectors';

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
      withLatestFrom(this.store$.pipe(select(selectGettingStartedReducerState))),
      switchMap(([action, state]) => this.organizationService.add(state.validOrganization)
        .pipe(
          switchMap((createdOrganization: Organization) => forkJoin(
            // Use the ID from the created organization for the site and user
            this.siteService.add(new Site(createdOrganization.id, createdOrganization.name, null)),
            this.authService.createUser({
              ...state.validUser,
              organizationId: createdOrganization.id,
              role: 'Owner',
            }),
          )
            .pipe(
              map(() => {
                this.snackBarService.addOrganizationSuccess();
                return new AuthActions.LogIn(state.validUser);
              }),
            )),
        )),
    );

  constructor(
    private store$: Store<SignUpState>,
    private actions: Actions,
    private authService: AuthService,
    private organizationService: OrganizationService,
    private siteService: SiteService,
    private snackBarService: SnackBarService,
  ) {}
}

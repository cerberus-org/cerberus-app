import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { MemberService } from '../../../data/services/member.service';
import { OrganizationService } from '../../../data/services/organization.service';
import { SiteService } from '../../../data/services/site.service';
import { Member, Organization, Site } from '../../../models';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { SignUpState } from '../reducers';
import { selectGettingStartedReducerState } from '../selectors/getting-started.selectors';

@Injectable()
export class GettingStartedEffects {

  /**
   * Listen for the Submit action, create the organization, user, member, and site,
   * then emit the success snack bar and dispatch AuthActions.SignIn with the valid credentials.
   */
  @Effect()
  submit$: Observable<Action> = this.actions
    .ofType(GettingStartedActions.SUBMIT)
    .pipe(
      withLatestFrom(this.store$.pipe(select(selectGettingStartedReducerState))),
      switchMap(([action, { validOrganization, validCredentials, validMember }]) => {
        return this.organizationService.add(validOrganization)
        // 1. Create the validOrganization first
          .pipe(
            // 2. Create the User and the default Site, using the generated ID from the created validOrganization
            switchMap((createdOrganization: Organization) => forkJoin(
              this.authService.createUser(validCredentials),
              this.siteService.add(new Site(createdOrganization.id, createdOrganization.name, null)),
            )
              .pipe(
                // 3. Create the Member using the UID from the created User
                switchMap(([createdUser]) => this.memberService.add({
                  ...new Member(validMember.firstName, validMember.lastName, 'Owner'),
                  userUid: createdUser.uid,
                  organizationId: createdOrganization.id,
                })
                  .pipe(
                    map(() => {
                      this.snackBarService.addOrganizationSuccess();
                      return new AuthActions.SignIn(validCredentials);
                    }),
                  )),
              )),
          );
      }),
    );

  constructor(
    public store$: Store<SignUpState>,
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private siteService: SiteService,
    private snackBarService: SnackBarService,
  ) {

  }
}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as AuthActions from '../../auth/actions/auth.actions';
import { AuthService } from '../../auth/services/auth.service';
import * as RouterActions from '../../core/actions/router.actions';
import { MemberService } from '../../core/services/member.service';
import { OrganizationService } from '../../core/services/organization.service';
import { SiteService } from '../../core/services/site.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Member, Organization, Site } from '../../shared/models';
import * as SignUpActions from '../actions/sign-up.actions';
import { PublicState } from '../reducers';
import { selectSignUpReducerState } from '../selectors/sign-up.selectors';

@Injectable()
export class SignUpEffects {

  /**
   * Listen for the Submit action, then dispatch the next action based on if the user is creating or joining an
   * existing organization.
   */
  @Effect()
  submit$: Observable<Action> = this.actions
    .ofType(SignUpActions.SUBMIT)
    .pipe(
      withLatestFrom(this.store$.pipe(select(selectSignUpReducerState))),
      map(([action, { joinExistingOrganization }]) =>
        joinExistingOrganization
          ? new SignUpActions.JoinOrganization()
          : new SignUpActions.CreateOrganization(),
      ),
    );

  /**
   * Listens for SignUpActions.CREATE_ORGANIZATION and the organization, user, member, and site,
   * then emits the success snackbar and dispatches AuthActions.SignIn with the valid credentials.
   */
  @Effect()
  createOrganization$: Observable<Action> = this.actions
    .ofType(SignUpActions.CREATE_ORGANIZATION)
    .pipe(
      withLatestFrom(this.store$.pipe(select(selectSignUpReducerState))),
      switchMap(([action, { validOrganization, validCredentials, validMember }]) => {
        return this.organizationService.add(validOrganization)
        // 1. Create the organization first
          .pipe(
            // 2. Create the User and the default Site, using the generated ID from the created organization
            switchMap((createdOrganization: Organization) => forkJoin(
              this.authService.createUser(validCredentials),
              this.siteService.add(new Site(createdOrganization.id, createdOrganization.name, null, null)),
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
                      this.snackBarService.createOrganizationSuccess();
                      return new AuthActions.SignIn(validCredentials);
                    }),
                  )),
              )),
          );
      }),
    );

  /**
   * Listens for the SignUpActions.CREATE_ORGANIZATION action, creates the user and member for the organization,
   * then emits the success snack bar and dispatch AuthActions.SignIn with the valid credentials.
   */
  @Effect({ dispatch: false })
  joinOrganization$: Observable<Action> = this.actions
    .ofType(SignUpActions.JOIN_ORGANIZATION)
    .pipe(
      withLatestFrom(this.store$.pipe(select(selectSignUpReducerState))),
      switchMap(([action, { validOrganization, validCredentials, validMember }]) =>
        this.authService.createUser(validCredentials)
          .pipe(
            // 3. Create the Member using the UID from the created User
            switchMap((createdUser: UserInfo) => this.memberService.add({
              ...new Member(validMember.firstName, validMember.lastName, 'Locked'),
              userUid: createdUser.uid,
              organizationId: validOrganization.id,
            })
              .pipe(
                map(() => {
                  this.snackBarService.joinOrganizationSuccess();
                  return new RouterActions.Go({ path: ['home'] });
                }),
              )),
          )),
    );

  constructor(
    public store$: Store<PublicState>,
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private siteService: SiteService,
    private snackBarService: SnackBarService,
  ) {

  }
}

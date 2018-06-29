import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { MemberService } from '../../../data/services/member.service';
import { OrganizationService } from '../../../data/services/organization.service';
import { SiteService } from '../../../data/services/site.service';
import { Member } from '../../../models';
import * as RouterActions from '../../../root/store/actions/router.actions';
import { RootState } from '../../../root/store/reducers';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { selectJoinOrganizationReducerState } from '../selectors/join-organization.selectors';

@Injectable()
export class JoinOrganizationEffects {

  /**
   * Listen for the Submit action, create the organization, user, member, and site,
   * then emit the success snack bar and dispatch AuthActions.SignIn with the valid credentials.
   */
  @Effect({ dispatch: false })
  submit$: Observable<Action> = this.actions
    .ofType(GettingStartedActions.SUBMIT)
    .pipe(
      withLatestFrom(this.store$.pipe(select(selectJoinOrganizationReducerState))),
      switchMap(([action, { validOrganization, validCredentials, validMember }]) =>
        this.authService.createUser(validCredentials)
          .pipe(
            // 3. Create the Member using the UID from the created User
            switchMap((createdUser: UserInfo) => this.memberService.add({
              ...new Member(validMember.firstName, validMember.lastName, 'Owner'),
              userUid: createdUser.uid,
              organizationId: validOrganization.id,
            })
              .pipe(
                map(() => {
                  this.snackBarService.addOrganizationSuccess();
                  return new RouterActions.Go({ path: [''] });
                }),
              )),
          )),
    );

  constructor(
    public store$: Store<RootState>,
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private siteService: SiteService,
    private snackBarService: SnackBarService,
  ) {

  }
}

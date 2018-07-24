import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MemberService } from '../../../data/services/member.service';
import { OrganizationService } from '../../../data/services/organization.service';
import * as ModelActions from '../../../root/store/actions/model.actions';
import * as SessionActions from '../actions/session.actions';

@Injectable()
export class SessionEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions.ofType(SessionActions.LOAD_DATA)
    .pipe(
      map((action: SessionActions.LoadData) => action.payload),
      switchMap((userInfo: UserInfo) => this.memberService.getByKey('userUid', userInfo.uid)
        .pipe(
          switchMap(([member]) => {
            return this.organizationService.getById(member.organizationId)
              .pipe(
                switchMap(organization => [
                  new SessionActions.LoadDataSuccess({
                    member,
                    userInfo,
                    organization: { ...organization, id: member.organizationId },
                  }),
                  // Load data for user
                  new ModelActions.LoadMembers(member.organizationId),
                  new ModelActions.LoadSites(member.organizationId),
                  new ModelActions.LoadVisits(member.organizationId),
                  new ModelActions.LoadVolunteers(member.organizationId),
                ]),
              );
          })),
      ),
    );

  constructor(
    private actions: Actions,
    private memberService: MemberService,
    private organizationService: OrganizationService,
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { MemberService } from '../../core/services/member.service';
import { OrganizationService } from '../../core/services/organization.service';
import { LoadTeamsSuccess, TeamsActionTypes } from '../actions/teams.actions';

@Injectable()
export class TeamsEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private organizationService: OrganizationService,
  ) {}

  @Effect()
  loadOrganizations$: Observable<any> = this.actions.pipe(
    ofType(TeamsActionTypes.LoadTeams),
    switchMap(() => this.memberService.getByKey('userUid', this.authService.currentUserInfo.uid)),
    mergeMap(members =>
      forkJoin(members.map(member => this.organizationService.getById(member.organizationId))),
    ),
    map(teams => new LoadTeamsSuccess({ teams })),
  );
}

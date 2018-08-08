import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import {
  LoadMembers,
  LoadMembersForTeam,
  LoadMembersForUser,
  LoadMembersSuccess,
  MembersActionTypes,
} from '../actions/members.actions';
import { MemberService } from '../services/member.service';

@Injectable()
export class MembersEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
  ) {}

  @Effect()
  loadMembers$: Observable<Action> = this.actions.pipe(
    ofType<LoadMembers>(MembersActionTypes.LoadMembers),
    switchMap(() => this.memberService.getAll(true).pipe(
      map(members => new LoadMembersSuccess({ members })),
    )),
  );

  @Effect()
  loadMembersForTeam$: Observable<Action> = this.actions.pipe(
    ofType<LoadMembersForTeam>(MembersActionTypes.LoadMembersForTeam),
    map(action => action.payload.teamId),
    switchMap(teamId => this.memberService.getByKey('teamId', teamId, true).pipe(
      map(members => new LoadMembersSuccess({ members })),
    )),
  );

  @Effect()
  loadMembersForUser$: Observable<Action> = this.actions.pipe(
    ofType<LoadMembersForUser>(MembersActionTypes.LoadMembersForUser),
    switchMap(() => this.memberService.getByKey('userUid', this.authService.currentUserInfo.uid, true).pipe(
      map(members => new LoadMembersSuccess({ members })),
    )),
  );
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { LoadTeams, LoadTeamsSuccess, TeamsActionTypes } from '../actions/teams.actions';
import { MemberService } from '../services/member.service';
import { OrganizationService } from '../services/organization.service';

@Injectable()
export class TeamsPageEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private organizationService: OrganizationService,
  ) {}

  @Effect()
  loadTeams$: Observable<Action> = this.actions.pipe(
    ofType<LoadTeams>(TeamsActionTypes.LoadTeams),
    switchMap(() => this.organizationService.getAll(true)
      .pipe(
        map(teams => new LoadTeamsSuccess({ teams })),
      )),
  );
}

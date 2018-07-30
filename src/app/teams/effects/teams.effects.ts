import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { AppState } from '../../core/reducers';
import { MemberService } from '../../core/services/member.service';
import { OrganizationService } from '../../core/services/organization.service';
import { LoadOrganizationsSuccess, TeamsActionTypes } from '../actions/teams.actions';

@Injectable()
export class TeamsEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private store$: Store<AppState>,
  ) {}

  @Effect()
  loadOrganizations$: Observable<any> = this.actions
    .ofType(TeamsActionTypes.LoadOrganizations)
    .pipe(
      switchMap(() => this.memberService.getByKey('userUid', this.authService.currentUserInfo.uid)),
      mergeMap(members => forkJoin(
        members.map(member => this.organizationService.getById(member.organizationId)),
      )),
      map(organizations => new LoadOrganizationsSuccess(organizations)),
    );
}

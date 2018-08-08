import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { selectSessionUserInfo } from '../../auth/selectors/session.selectors';
import { AuthService } from '../../auth/services/auth.service';
import { AppState } from '../../core/reducers';
import { MemberService } from '../../core/services/member.service';
import { OrganizationService } from '../../core/services/organization.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Member } from '../../shared/models';
import { CreateTeam, JoinTeam, LoadTeams, LoadTeamsSuccess, TeamsPageActionTypes } from '../actions/teams-page.actions';
import { CreateTeamDialogComponent } from '../containers/create-team-dialog/create-team-dialog.component';
import { JoinTeamDialogComponent } from '../containers/join-team-dialog/join-team-dialog.component';

@Injectable()
export class TeamsPageEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private organizationService: OrganizationService,
    private snackbarService: SnackBarService,
    private store$: Store<AppState>,
    private dialog: MatDialog,
  ) {}

  @Effect()
  loadTeams$: Observable<any> = this.actions.pipe(
    ofType<LoadTeams>(TeamsPageActionTypes.LoadTeams),
    switchMap(() => this.memberService.getByKey('userUid', this.authService.currentUserInfo.uid)),
    mergeMap(members =>
      forkJoin(members.map(member => this.organizationService.getById(member.organizationId))),
    ),
    map(teams => new LoadTeamsSuccess({ teams })),
  );

  @Effect({ dispatch: false })
  createTeam$: Observable<any> = this.actions.pipe(
    ofType<CreateTeam>(TeamsPageActionTypes.CreateTeam),
    map(action => action.payload.team),
    withLatestFrom(this.store$.pipe(select(selectSessionUserInfo))),
    mergeMap(([team, userInfo]) =>
      this.organizationService.add(team).pipe(
        switchMap(createdTeam =>
          this.memberService.add({
            userUid: userInfo.uid,
            organizationId: createdTeam.id,
            role: 'Owner',
          } as Member)),
      ),
    ),
    tap(() => {
      this.snackbarService.createTeamSuccess();
    }),
  );

  @Effect({ dispatch: false })
  joinTeam$: Observable<any> = this.actions.pipe(
    ofType<JoinTeam>(TeamsPageActionTypes.JoinTeam),
    map(action => action.payload.team),
    withLatestFrom(this.store$.pipe(select(selectSessionUserInfo))),
    mergeMap(([team, userInfo]) =>
      this.memberService.add({
        userUid: userInfo.uid,
        organizationId: team.id,
        role: 'Locked',
      } as Member),
    ),
    tap(() => {
      this.snackbarService.joinTeamSuccess();
    }),
  );

  @Effect({ dispatch: false })
  openCreateTeamDialog$: Observable<any> = this.actions.pipe(
    ofType<LoadTeams>(TeamsPageActionTypes.OpenCreateTeamDialog),
    tap(() => this.dialog.open(CreateTeamDialogComponent)),
  );

  @Effect({ dispatch: false })
  openJoinTeamDialog$: Observable<any> = this.actions.pipe(
    ofType<LoadTeams>(TeamsPageActionTypes.OpenJoinTeamDialog),
    tap(() => this.dialog.open(JoinTeamDialogComponent)),
  );
}

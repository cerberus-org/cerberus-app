import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { getUserInfoUid } from '../../auth/selectors/auth.selectors';
import { AppState } from '../../core/reducers';
import { MemberService } from '../../core/services/member.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { TeamService } from '../../core/services/team.service';
import { Member } from '../../shared/models';
import {
  CreateTeam,
  JoinTeam,
  OpenCreateTeamDialog,
  OpenJoinTeamDialog,
  TeamsPageActionTypes,
} from '../actions/teams-page.actions';
import { CreateTeamDialogComponent } from '../containers/create-team-dialog/create-team-dialog.component';
import { JoinTeamDialogComponent } from '../containers/join-team-dialog/join-team-dialog.component';

@Injectable()
export class TeamsPageEffects {

  constructor(
    private actions: Actions,
    private memberService: MemberService,
    private teamService: TeamService,
    private snackbarService: SnackBarService,
    private store$: Store<AppState>,
    private dialog: MatDialog,
  ) {}

  @Effect({ dispatch: false })
  createTeam$: Observable<any> = this.actions.pipe(
    ofType<CreateTeam>(TeamsPageActionTypes.CreateTeam),
    map(action => action.payload.team),
    withLatestFrom(this.store$.pipe(select(getUserInfoUid))),
    mergeMap(([team, uid]) =>
      this.teamService.add(team).pipe(
        switchMap(createdTeam =>
          this.memberService.add({
            userUid: uid,
            teamId: createdTeam.id,
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
    withLatestFrom(this.store$.pipe(select(getUserInfoUid))),
    mergeMap(([team, uid]) =>
      this.memberService.add({
        userUid: uid,
        teamId: team.id,
        role: 'Locked',
      } as Member),
    ),
    tap(() => {
      this.snackbarService.joinTeamSuccess();
    }),
  );

  @Effect({ dispatch: false })
  openCreateTeamDialog$: Observable<any> = this.actions.pipe(
    ofType<OpenCreateTeamDialog>(TeamsPageActionTypes.OpenCreateTeamDialog),
    tap(() => this.dialog.open(CreateTeamDialogComponent)),
  );

  @Effect({ dispatch: false })
  openJoinTeamDialog$: Observable<any> = this.actions.pipe(
    ofType<OpenJoinTeamDialog>(TeamsPageActionTypes.OpenJoinTeamDialog),
    tap(() => this.dialog.open(JoinTeamDialogComponent)),
  );
}

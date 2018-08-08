import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Back } from '../../core/actions/router.actions';
import { AppState } from '../../core/reducers';
import { getSelectedTeamId } from '../../core/selectors/teams.selectors';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { VisitService } from '../../core/services/visit.service';
import { VolunteerService } from '../../core/services/volunteer.service';
import * as CheckInActions from '../actions/check-in.actions';

@Injectable()
export class CheckInEffects {

  /**
   * Listen for the SubmitNewVolunteer action, create the newVolunteer, emit the snackbar,
   * then dispatch the SubmitNewVolunteerSuccess action with the created newVolunteer.
   */
  @Effect()
  submitNewVolunteer$: Observable<Action> = this.actions
    .ofType(CheckInActions.SUBMIT_NEW_VOLUNTEER)
    .pipe(
      map((action: CheckInActions.SubmitNewVolunteer) => action.payload),
      withLatestFrom(this.store$.pipe(select(getSelectedTeamId))),
      switchMap(([volunteer, teamId]) => this.volunteerService.add({ ...volunteer, teamId })
        .pipe(
          map(() => {
            this.snackBarService.createVolunteerSuccess();
            return new CheckInActions.SubmitNewVolunteerSuccess();
          }))),
    );

  /**
   * Listen for the CheckIn action, create the visit,
   * then emit the success snack bar and navigate back to the dashboard.
   */
  @Effect()
  checkIn$: Observable<Action> = this.actions
    .ofType(CheckInActions.CHECK_IN)
    .pipe(
      map((action: CheckInActions.CheckIn) => action.payload),
      withLatestFrom(this.store$.pipe(select(getSelectedTeamId))),
      switchMap(([visit, teamId]) => this.visitService.add({
        ...visit,
        teamId,
        siteId: null, // TODO: Implement site association
      })
        .pipe(
          map(() => {
            this.snackBarService.checkInSuccess();
            return new Back();
          }))),
    );

  /**
   * Listen for the CheckOut action, update the visit,
   * then emit the snackbar and navigate back to the dashboard.
   */
  @Effect()
  checkOut$: Observable<Action> = this.actions
    .ofType(CheckInActions.CHECK_OUT)
    .pipe(
      map((action: CheckInActions.CheckOut) => action.payload),
      switchMap(visit => this.visitService.update(visit)
        .pipe(
          map(() => {
            this.snackBarService.checkOutSuccess();
            return new Back();
          }),
        )),
    );

  constructor(
    private store$: Store<AppState>,
    private actions: Actions,
    private snackBarService: SnackBarService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
  ) {}
}

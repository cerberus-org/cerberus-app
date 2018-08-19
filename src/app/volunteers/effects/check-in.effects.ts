import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Back } from '../../core/actions/router.actions';
import { AppState } from '../../core/reducers';
import { getSelectedTeamId } from '../../core/selectors/teams.selectors';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { VisitService } from '../../core/services/visit.service';
import { VolunteerService } from '../../core/services/volunteer.service';
import { Volunteer } from '../../shared/models';
import { CheckIn, CheckInActionTypes, CheckOut, SubmitNewVolunteer } from '../actions/check-in.actions';
import { getSelectedSiteId } from '../helpers/check-in.helpers';

@Injectable()
export class CheckInEffects {

  /**
   * Listen for the SubmitNewVolunteer action, create the newVolunteer, emit the snackbar,
   * then dispatch the SubmitNewVolunteerSuccess action with the created newVolunteer.
   */
  @Effect({ dispatch: false })
  submitNewVolunteer$: Observable<Action | Volunteer> = this.actions.pipe(
    ofType<SubmitNewVolunteer>(CheckInActionTypes.SubmitNewVolunteer),
    map(action => action.payload.volunteer),
    withLatestFrom(this.store$.pipe(select(getSelectedTeamId))),
    switchMap(([volunteer, teamId]) => this.volunteerService.add({ ...volunteer, teamId }).pipe(
      tap(() => {
        this.snackBarService.createVolunteerSuccess();
      }))),
  );

  /**
   * Listen for the CheckIn action, create the visit,
   * then emit the success snack bar and navigate back to the dashboard.
   */
  @Effect()
  checkIn$: Observable<Action> = this.actions.pipe(
    ofType<CheckIn>(CheckInActionTypes.CheckIn),
    map(action => action.payload.visit),
    withLatestFrom(this.store$.pipe(select(getSelectedTeamId))),
    switchMap(([visit, teamId]) => this.visitService.add({
      ...visit,
      teamId,
      siteId: getSelectedSiteId(),
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
  checkOut$: Observable<Action> = this.actions.pipe(
    ofType<CheckOut>(CheckInActionTypes.CheckOut),
    map(action => action.payload.visit),
    switchMap(visit => this.visitService.update(visit).pipe(
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

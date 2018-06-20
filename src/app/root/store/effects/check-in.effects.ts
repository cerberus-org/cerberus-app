import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SnackBarService, VisitService, VolunteerService } from '../../../services';

import * as CheckInActions from '../actions/check-in.actions';
import * as RouterActions from '../actions/router.actions';

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
      switchMap(volunteer => this.volunteerService.add(volunteer)
        .pipe(
          map(() => {
            this.snackBarService.signUpSuccess();
            return new CheckInActions.SubmitNewVolunteerSuccess();
          })),
      ),
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
      switchMap(visit => this.visitService.add(visit)
        .pipe(
          map(() => {
            this.snackBarService.checkInSuccess();
            return new RouterActions.Go({ path: ['/dashboard'] });
          })),
      ),
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
            return new RouterActions.Go({ path: ['/dashboard'] });
          }),
        )),
    );

  constructor(
    private actions: Actions,
    private snackBarService: SnackBarService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
  ) {}
}

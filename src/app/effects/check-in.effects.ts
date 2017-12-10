import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import * as CheckInActions from '../actions/check-in.actions';
import * as RouterActions from '../actions/router.actions';
import { SnackBarService } from '../services/snack-bar.service';
import { VisitService } from '../services/visit.service';
import { VolunteerService } from '../services/volunteer.service';

@Injectable()
export class CheckInEffects {

  /**
   * Listen for the LoadData action, get the visits and volunteers,
   * then dispatch the LoadDataSuccess action with the data.
   */
  @Effect()
  loadData$: Observable<Action> = this.actions
    .ofType(CheckInActions.LOAD_DATA)
    .map((action: CheckInActions.LoadData) => action.payload)
    .switchMap(payload => Observable
      .forkJoin(
        this.visitService.getByKey('siteId', payload.siteId, true).first(),
        this.volunteerService.getByKey('organizationId', payload.organizationId, true).first())
      .map(results => {
        return { visits: results[0], volunteers: results[1] }
      })
      .map(data => new CheckInActions.LoadDataSuccess(data)));

  /**
   * Listen for the SubmitNewVolunteer action, create the newVolunteer, emit the snackbar,
   * then dispatch the SubmitNewVolunteerSuccess action with the created newVolunteer.
   */
  @Effect()
  submitNewVolunteer$: Observable<Action> = this.actions
    .ofType(CheckInActions.SUBMIT_NEW_VOLUNTEER)
    .map((action: CheckInActions.SubmitNewVolunteer) => action.payload)
    .switchMap(volunteer => this.volunteerService.add(volunteer)
      .map(created => {
        this.snackBarService.signUpSuccess();
        return new CheckInActions.SubmitNewVolunteerSuccess(created)
      }));

  /**
   * Listen for the CheckIn action, create the visit,
   * then emit the success snack bar and navigate back to the dashboard.
   */
  @Effect()
  checkIn$: Observable<Action> = this.actions
    .ofType(CheckInActions.CHECK_IN)
    .map((action: CheckInActions.CheckIn) => action.payload)
    .switchMap(visit => this.visitService.add(visit)
      .mergeMap(() => {
        this.snackBarService.checkInSuccess();
        return [
          new RouterActions.Go({ path: ['/dashboard'] }),
          new CheckInActions.CheckInOrOutSuccess({})
        ]
      }));

  /**
   * Listen for the CheckOut action, update the visit,
   * then emit the snackbar and navigate back to the dashboard.
   */
  @Effect()
  checkOut$: Observable<Action> = this.actions
    .ofType(CheckInActions.CHECK_OUT)
    .map((action: CheckInActions.CheckOut) => action.payload)
    .switchMap(visit => this.visitService.update(visit)
      .mergeMap(() => {
        this.snackBarService.checkOutSuccess();
        return [
          new RouterActions.Go({ path: ['/dashboard'] }),
          new CheckInActions.CheckInOrOutSuccess({})
        ];
      }));

  constructor(private actions: Actions,
              private snackBarService: SnackBarService,
              private visitService: VisitService,
              private volunteerService: VolunteerService) {}
}

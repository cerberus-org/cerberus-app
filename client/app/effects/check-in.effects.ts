import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';

import * as CheckInActions from '../actions/check-in.actions'
import { VisitService } from '../services/visit.service';
import { VolunteerService } from '../services/volunteer.service';
import { SnackBarService } from '../services/snack-bar.service';

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
        this.visitService.getBySiteId(payload.siteId),
        this.volunteerService.getByOrganizationId(payload.organizationId))
      .map(results => {
        return { visits: results[0], volunteers: results[1] }
      })
      .map(data => new CheckInActions.LoadDataSuccess(data)));

  /**
   * Listen for the SubmitNewVolunteer action, create the volunteer, emit the snackbar,
   * then dispatch the SubmitNewVolunteerSuccess action with the created volunteer.
   */
  @Effect()
  submitNewVolunteer$: Observable<Action> = this.actions
    .ofType(CheckInActions.SUBMIT_NEW_VOLUNTEER)
    .map((action: CheckInActions.SubmitNewVolunteer) => action.payload)
    .switchMap(volunteer => this.volunteerService.create(volunteer)
      .map(created => {
        this.snackBarService.signUpSuccess();
        return new CheckInActions.SubmitNewVolunteerSuccess(created)
      }));

  /**
   * Listen for the CheckIn action, create the visit,
   * then emit the success snack bar and navigate back to the dashboard.
   */
  @Effect({ dispatch: false })
  checkIn$: Observable<Action> = this.actions
    .ofType(CheckInActions.CHECK_IN)
    .map((action: CheckInActions.CheckIn) => action.payload)
    .switchMap(visit => this.visitService.create(visit)
      .do(() => {
        this.router.navigateByUrl('/dashboard');
        this.snackBarService.checkInSuccess();
      }));

  /**
   * Listen for the CheckOut action, update the visit,
   * then emit the snackbar and navigate back to the dashboard.
   */
  @Effect({ dispatch: false })
  checkOut$: Observable<Action> = this.actions
    .ofType(CheckInActions.CHECK_OUT)
    .map((action: CheckInActions.CheckOut) => action.payload)
    .switchMap(visit => this.visitService.update(visit)
      .do(() => {
        this.router.navigateByUrl('/dashboard');
        this.snackBarService.checkOutSuccess();
      }));

  constructor(private actions: Actions,
              private router: Router,
              private snackBarService: SnackBarService,
              private visitService: VisitService,
              private volunteerService: VolunteerService) {}
}

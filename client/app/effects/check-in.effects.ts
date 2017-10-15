import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
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
  loadData: Observable<Action> = this.actions
    .ofType(CheckInActions.LOAD_DATA)
    .map((action: CheckInActions.LoadData) => action.payload)
    .switchMap(payload => Observable.forkJoin(
      this.visitService.getBySite(payload.siteId),
      this.volunteerService.getByOrganization(payload.organizationId))
      .map(results => {
        return { visits: results[0], volunteers: results[1] }
      })
      .map(data => new CheckInActions.LoadDataSuccess(data)));

  /**
   * Listen for the SubmitNewVolunteer action, create the volunteer, emit the snackbar,
   * then dispatch the SubmitNewVolunteerSuccess action with the created volunteer.
   */
  @Effect()
  submitNewVolunteer: Observable<Action> = this.actions
    .ofType(CheckInActions.SUBMIT_NEW_VOLUNTEER)
    .map((action: CheckInActions.SubmitNewVolunteer) => action.payload)
    .switchMap(volunteer => this.volunteerService.create(volunteer))
      .map(created => {
        this.snackBarService.signUpSuccess();
        return new CheckInActions.SubmitNewVolunteerSuccess(created)
      });

  constructor(private actions: Actions,
              private snackBarService: SnackBarService,
              private visitService: VisitService,
              private volunteerService: VolunteerService) {}
}

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

@Injectable()
export class CheckInEffects {

  /**
   * Listen for the LoadData action, get the visits and volunteers,
   * then dispatch the success action.
   */
  @Effect()
  loadData: Observable<Action> = this.actions.ofType(CheckInActions.LOAD_DATA)
    .map((action: CheckInActions.LoadData) => action.payload)
    .switchMap(payload => Observable.forkJoin(
      this.visitService.getBySite(payload.siteId),
      this.volunteerService.getByOrganization(payload.organizationId))
      .map(results => {
        return { visits: results[0], volunteers: results[1] }
      })
      .map(data => new CheckInActions.LoadDataSuccess(data)));

  constructor(private actions: Actions,
              private visitService: VisitService,
              private volunteerService: VolunteerService) {}
}

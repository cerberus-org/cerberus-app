import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as VisitsActions from '../actions/visits.actions'
import { Observable } from 'rxjs/Observable';
import { VisitService } from '../services/visit.service';

@Injectable()
export class VisitsEffects {

  /**
   * Listen for the LoadForOrganization action, get the visits, then dispatch the success action.
   */
  @Effect()
  loadForOrganization: Observable<Action> = this.actions.ofType(VisitsActions.LOAD_FOR_ORGANIZATION)
    .map((action: VisitsActions.LoadForOrganization) => action.payload)
    .switchMap(organizationId => this.visitService.getByOrganization(organizationId)
      .map(visits => new VisitsActions.LoadSuccess(visits)));

  constructor(private actions: Actions,
              private visitService: VisitService) {}
}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as DataDisplayActions from '../actions/data-display.actions';
import { VisitService } from '../services/visit.service';

@Injectable()
export class DataDisplayEffects {

  /**
   * Listen for the LoadData action, get the visits, then dispatch the success action.
   */
  @Effect()
  loadData$: Observable<Action> = this.actions.ofType(DataDisplayActions.LOAD_DATA)
    .map((action: DataDisplayActions.LoadData) => action.payload)
    .switchMap(organizationId => this.visitService.getAll()
      .map(visits => new DataDisplayActions.LoadDataSuccess(visits)));

  constructor(private actions: Actions,
              private visitService: VisitService) {}
}

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { DataDisplayEffects } from './data-display.effects';
import { LoadData, LoadDataSuccess } from '../actions/data-display.actions';
import { MockVisitService, VisitService } from '../services/visit.service';
import { testVisits } from '../models/visit';

describe('DataDisplayEffects', () => {
  let effects: DataDisplayEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataDisplayEffects,
        provideMockActions(() => actions),
        { provide: VisitService, useClass: MockVisitService },
      ],
    });
    effects = TestBed.get(DataDisplayEffects);
  });

  describe('loadData$', () => {

    it('returns a LOAD_DATA_SUCCESS action, with the visits and volunteers, on success', () => {
      const loadData = new LoadData(testVisits[0].organizationId);
      const loadDataSuccess = new LoadDataSuccess(testVisits);

      actions = hot('a', { a: loadData });
      const expected = cold('b', { b: loadDataSuccess });

      expect(effects.loadData$).toBeObservable(expected);
    });
  });
});

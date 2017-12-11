import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { LoadData, LoadDataSuccess } from '../actions/data-display.actions';
import { testVisits } from '../models/visit';
import { MockVisitService, VisitService } from '../services/visit.service';
import { DataDisplayEffects } from './data-display.effects';

describe('DataDisplayEffects', () => {
  let effects: DataDisplayEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        DataDisplayEffects,
        provideMockActions(() => actions),
        { provide: VisitService, useClass: MockVisitService },
      ],
    });
    effects = TestBed.get(DataDisplayEffects);
  }));

  describe('loadData$', () => {

    it('should return a LOAD_DATA_SUCCESS action, with the visits and volunteers, on success', async(() => {
      const loadData = new LoadData(testVisits[0].organizationId);
      const loadDataSuccess = new LoadDataSuccess(testVisits);

      actions = hot('a', { a: loadData });
      const expected = cold('b', { b: loadDataSuccess });

      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as CheckInActions from '../actions/check-in.actions'
import { CheckInEffects } from './check-in.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockVisitService, VisitService } from '../services/visit.service';
import { MockVolunteerService, VolunteerService } from '../services/volunteer.service';

describe('CheckInEffects', () => {
  let effects: CheckInEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        CheckInEffects,
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: VisitService, useClass: MockVisitService },
        { provide: VolunteerService, useClass: MockVolunteerService },
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.get(CheckInEffects);
  });

  describe('loadData', () => {

    it('should work', () => {
      actions = hot('--a-', { a: CheckInActions.LoadData });

      const expected = cold('--b', { b: CheckInActions.LoadDataSuccess });

      expect(effects.loadData$).toBeObservable(expected);
    });
  });
});

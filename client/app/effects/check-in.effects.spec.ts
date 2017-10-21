import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { CheckInEffects } from './check-in.effects';
import { LoadData, LoadDataSuccess, SubmitNewVolunteer, SubmitNewVolunteerSuccess } from '../actions/check-in.actions';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockVisitService, VisitService } from '../services/visit.service';
import { MockVolunteerService, VolunteerService } from '../services/volunteer.service';
import { testVisits } from '../models/visit';
import { testVolunteers } from '../models/volunteer';

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
        provideMockActions(() => actions),
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: VisitService, useClass: MockVisitService },
        { provide: VolunteerService, useClass: MockVolunteerService }
      ],
    });
    effects = TestBed.get(CheckInEffects);
  });

  describe('loadData$', () => {

    it('return a LOAD_DATA_SUCCESS action, with the visits and volunteers, on success', () => {
      const loadData = new LoadData({
        siteId: testVisits[0].siteId,
        organizationId: testVolunteers[0].organizationId
      });
      const loadDataSuccess = new LoadDataSuccess({
        visits: testVisits,
        volunteers: testVolunteers
      });

      actions = hot('a', { a: loadData });
      const expected = cold('b', { b: loadDataSuccess });

      expect(effects.loadData$).toBeObservable(expected);
    });

    it('return a LOAD_DATA_SUCCESS action, with the visits and volunteers, on success', () => {
      const sub = new SubmitNewVolunteer(testVolunteers[0]);
      const loadDataSuccess = ({
        visits: testVisits,
        volunteers: testVolunteers
      });

      actions = hot('a', { a: new SubmitNewVolunteer(testVolunteers[0]) });
      const expected = cold('b', { b: new SubmitNewVolunteerSuccess(testVolunteers[0]) });

      expect(effects.submitNewVolunteer$).toBeObservable(expected);
    });
  });
});

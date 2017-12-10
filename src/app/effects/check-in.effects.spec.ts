import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as CheckInActions from '../actions/check-in.actions';
import { testVisits } from '../models/visit';
import { testVolunteers } from '../models/volunteer';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockVisitService, VisitService } from '../services/visit.service';
import { MockVolunteerService, VolunteerService } from '../services/volunteer.service';
import { CheckInEffects } from './check-in.effects';

describe('CheckInEffects', () => {
  let effects: CheckInEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
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
  }));

  describe('loadData$', () => {

    it('returns a LOAD_DATA_SUCCESS action, with the visits and volunteers, on success', async(() => {
      const loadData = new CheckInActions.LoadData({
        siteId: testVisits[0].siteId,
        organizationId: testVolunteers[0].organizationId
      });
      const loadDataSuccess = new CheckInActions.LoadDataSuccess({
        visits: testVisits,
        volunteers: testVolunteers
      });

      actions = hot('a', { a: loadData });
      const expected = cold('b', { b: loadDataSuccess });

      expect(effects.loadData$).toBeObservable(expected);
    }));
  });

  describe('submitNewVolunteer$', () => {

    it('returns a SUBMIT_NEW_VOLUNTEER_SUCCESS action, with the visits and volunteers, on success', async(() => {
      const submitNewVolunteer = new CheckInActions.SubmitNewVolunteer(testVolunteers[0]);
      const submitNewVolunteerSuccess = new CheckInActions.SubmitNewVolunteerSuccess(testVolunteers[0]);

      actions = hot('a', { a: submitNewVolunteer });
      const expected = cold('b', { b: submitNewVolunteerSuccess });

      expect(effects.submitNewVolunteer$).toBeObservable(expected);
    }));
  });

  describe('checkIn$', () => {

    it('navigates to the dashboard and displays the checkInSuccess snackbar, on success', async(() => {
      const checkIn = new CheckInActions.CheckIn(testVisits[0]);
      const checkInSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkInSuccess');

      actions = hot('a', { a: checkIn });

      effects.checkOut$.subscribe(() => {
        expect(checkInSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('checkOut$', () => {

    it('navigates to the dashboard and displays the checkOutSuccess snackbar, on success', async(() => {
      const checkOut = new CheckInActions.CheckOut(testVisits[0]);
      const checkOutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkOutSuccess');

      actions = hot('a', { a: checkOut });

      effects.checkOut$.subscribe(() => {
        expect(checkOutSuccessSpy).toHaveBeenCalled();
      });
    }));
  });
});

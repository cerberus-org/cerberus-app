import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { CheckInEffects } from './check-in.effects';
import { CheckIn, CheckOut, LoadData, LoadDataSuccess, SubmitNewVolunteer, SubmitNewVolunteerSuccess } from '../actions/check-in.actions';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockVisitService, VisitService } from '../services/visit.service';
import { MockVolunteerService, VolunteerService } from '../services/volunteer.service';
import { testVisits } from '../models/visit';
import { testVolunteers } from '../models/volunteer';
import { Router } from '@angular/router';

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

    it('returns a LOAD_DATA_SUCCESS action, with the visits and volunteers, on success', () => {
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
  });

  describe('submitNewVolunteer$', () => {

    it('returns a SUBMIT_NEW_VOLUNTEER_SUCCESS action, with the visits and volunteers, on success', () => {
      const submitNewVolunteer = new SubmitNewVolunteer(testVolunteers[0]);
      const submitNewVolunteerSuccess = new SubmitNewVolunteerSuccess(testVolunteers[0]);

      actions = hot('a', { a: submitNewVolunteer });
      const expected = cold('b', { b: submitNewVolunteerSuccess });

      expect(effects.submitNewVolunteer$).toBeObservable(expected);
    });
  });

  describe('checkIn$', () => {

    it('navigates to the dashboard and displays the snackbar, on success', () => {
      const checkIn = new CheckIn(testVisits[0]);
      const navigateByUrlSpy = spyOn(TestBed.get(Router), 'navigateByUrl');
      const checkInSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkInSuccess');

      actions = hot('a', { a: checkIn });

      effects.checkOut$.subscribe(() => {
        expect(navigateByUrlSpy).toHaveBeenCalledWith('/dashboard');
        expect(checkInSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('checkOut$', () => {

    it('navigates to the dashboard and displays the snackbar, on success', () => {
      const checkOut = new CheckOut(testVisits[0]);
      const navigateByUrlSpy = spyOn(TestBed.get(Router), 'navigateByUrl');
      const checkOutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkOutSuccess');

      actions = hot('a', { a: checkOut });

      effects.checkOut$.subscribe(() => {
        expect(navigateByUrlSpy).toHaveBeenCalledWith('/dashboard');
        expect(checkOutSuccessSpy).toHaveBeenCalled();
      });
    });
  });
});

import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/index';

import * as CheckInActions from '../actions/check-in.actions';
import * as RouterActions from '../actions/router.actions';
import { testVisits, testVolunteers } from '../models';
import { SnackBarService } from '../services';
import { mockServiceProviders } from '../services/mock-service-providers';
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
      ].concat(mockServiceProviders),
    });
    effects = TestBed.get(CheckInEffects);
  }));

  describe('submitNewVolunteer$', () => {
    it('should dispatch CheckInActions.SubmitNewVolunteerSuccess', () => {
      actions = hot('a', {
        a: new CheckInActions.SubmitNewVolunteer(testVolunteers[0]),
      });
      const expected = cold('b', {
        b: new CheckInActions.SubmitNewVolunteerSuccess(),
      });
      expect(effects.submitNewVolunteer$).toBeObservable(expected);
    });

    it('should open the signUpSuccess snackbar', () => {
      const signUpSuccessSpy = spyOn(TestBed.get(SnackBarService), 'signUpSuccess');
      effects.submitNewVolunteer$.subscribe(() => {
        expect(signUpSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('checkIn$', () => {
    it('should dispatch RouterActions.Go', () => {
      actions = hot('a', {
        a: new CheckInActions.CheckIn(testVisits[0]),
      });
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/dashboard'] }),
      });
      expect(effects.checkIn$).toBeObservable(expected);
    });

    it('should open the checkInSuccess snackbar', () => {
      const checkInSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkInSuccess');
      effects.checkIn$.subscribe(() => {
        expect(checkInSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('checkOut$', () => {
    it('should dispatch RouterActions.Go', () => {
      actions = hot('a', {
        a: new CheckInActions.CheckOut(testVisits[0]),
      });
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/dashboard'] }),
      });
      expect(effects.checkOut$).toBeObservable(expected);
    });

    it('should open the checkOutSuccess snackbar', () => {
      const checkOutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkOutSuccess');
      effects.checkOut$.subscribe(() => {
        expect(checkOutSuccessSpy).toHaveBeenCalled();
      });
    });
  });
});

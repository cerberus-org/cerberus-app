import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { mockVisits } from '../../../mock/objects/visit.mock';
import { mockVolunteers } from '../../../mock/objects/volunteer.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as CheckInActions from '../actions/check-in.actions';
import * as RouterActions from '../actions/router.actions';
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
        ...mockServiceProviders,
      ],
    });
    effects = TestBed.get(CheckInEffects);
  }));

  describe('submitNewVolunteer$', () => {
    it('should dispatch CheckInActions.SubmitNewVolunteerSuccess', () => {
      actions = hot('a', {
        a: new CheckInActions.SubmitNewVolunteer(mockVolunteers[0]),
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
        a: new CheckInActions.CheckIn(mockVisits[0]),
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
        a: new CheckInActions.CheckOut(mockVisits[0]),
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

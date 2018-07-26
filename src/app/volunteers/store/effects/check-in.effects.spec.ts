import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { mockVisits } from '../../../../mocks/objects/visit.mock';
import { mockVolunteers } from '../../../../mocks/objects/volunteer.mock';
import { mockServiceProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import * as RouterActions from '../../../core/store/actions/router.actions';
import * as CheckInActions from '../actions/check-in.actions';
import { CheckInEffects } from './check-in.effects';

describe('CheckInEffects', () => {
  let effects: CheckInEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckInEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
      imports: [
        RouterTestingModule,
        ...mockStoreModules,
      ],
    });
    effects = TestBed.get(CheckInEffects);
  }));

  describe('submitNewVolunteer$', () => {
    beforeEach(() => {
      actions = hot('a', {
        a: new CheckInActions.SubmitNewVolunteer(mockVolunteers[0]),
      });
    });

    it('should dispatch CheckInActions.SubmitNewVolunteerSuccess', () => {
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
    beforeEach(() => {
      actions = hot('a', {
        a: new CheckInActions.CheckIn(mockVisits[0]),
      });
    });

    it('should dispatch RouterActions.Go', () => {
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['organization/volunteers'] }),
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
    beforeEach(() => {
      actions = hot('a', {
        a: new CheckInActions.CheckOut(mockVisits[0]),
      });
    });

    it('should dispatch RouterActions.Go', () => {
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['organization/volunteers'] }),
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

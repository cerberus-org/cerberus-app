import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { mockVisits } from '../../../mocks/objects/visit.mock';
import { mockVolunteers } from '../../../mocks/objects/volunteer.mock';
import { mockProviders } from '../../../mocks/providers.mock';
import { mockStoreModules } from '../../../mocks/store.mock';
import * as RouterActions from '../../core/actions/router.actions';
import { SnackBarService } from '../../core/services/snack-bar.service';
import * as CheckInActions from '../actions/check-in.actions';
import { CheckInEffects } from './check-in.effects';

xdescribe('CheckInEffects', () => {
  let effects: CheckInEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckInEffects,
        provideMockActions(() => actions),
        ...mockProviders,
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

    it('should dispatch CheckInActions.SubmitNewVolunteerSuccess', async(() => {
      const expected = cold('b', {
        b: new CheckInActions.SubmitNewVolunteerSuccess(),
      });
      expect(effects.submitNewVolunteer$).toBeObservable(expected);
    }));

    it('should open the createVolunteerSuccess snackbar', async(() => {
      const signUpSuccessSpy = spyOn(TestBed.get(SnackBarService), 'createVolunteerSuccess');
      effects.submitNewVolunteer$.subscribe(() => {
        expect(signUpSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('checkIn$', () => {
    beforeEach(() => {
      actions = hot('a', {
        a: new CheckInActions.CheckIn(mockVisits[0]),
      });
    });

    it('should dispatch RouterActions.Back', async(() => {
      const expected = cold('b', {
        b: new RouterActions.Back(),
      });
      expect(effects.checkIn$).toBeObservable(expected);
    }));

    it('should open the checkInSuccess snackbar', async(() => {
      const checkInSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkInSuccess');
      effects.checkIn$.subscribe(() => {
        expect(checkInSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('checkOut$', () => {
    beforeEach(() => {
      actions = hot('a', {
        a: new CheckInActions.CheckOut(mockVisits[0]),
      });
    });

    it('should dispatch RouterActions.Back', async(() => {
      const expected = cold('b', {
        b: new RouterActions.Back(),
      });
      expect(effects.checkOut$).toBeObservable(expected);
    }));

    it('should open the checkOutSuccess snackbar', async(() => {
      const checkOutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'checkOutSuccess');
      effects.checkOut$.subscribe(() => {
        expect(checkOutSuccessSpy).toHaveBeenCalled();
      });
    }));
  });
});
